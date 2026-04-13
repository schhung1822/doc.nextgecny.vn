import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

const setNoCacheHeaders = (res, filePath = '') => {
  if (!filePath || /\.(html|md|json)$/i.test(filePath)) {
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return;
  }

  res.setHeader('Cache-Control', 'no-cache');
};

const startServer = async () => {
  if (isProduction) {
    const distPath = path.join(__dirname, 'dist');

    app.use(
      express.static(distPath, {
        etag: true,
        maxAge: 0,
        setHeaders: (res, filePath) => setNoCacheHeaders(res, filePath),
      }),
    );

    app.get('*', (req, res) => {
      setNoCacheHeaders(res);
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      appType: 'spa',
      server: {
        middlewareMode: true,
      },
    });

    app.use((req, res, next) => {
      if (!path.extname(req.path) || /\.(html|md|json)$/i.test(req.path)) {
        setNoCacheHeaders(res, req.path);
      }
      next();
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        let template = await fs.readFile(path.join(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);

        setNoCacheHeaders(res);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (error) {
        if (error instanceof Error) {
          vite.ssrFixStacktrace(error);
        }
        next(error);
      }
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (${isProduction ? 'production' : 'development'})`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
