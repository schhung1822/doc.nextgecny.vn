import fs from 'fs';
import path from 'path';

// read the file
const mockDataPath = path.resolve('./src/data/mockData.ts');
let content = fs.readFileSync(mockDataPath, 'utf8');

// Ensure docs directory exists
const docsDir = path.resolve('./public/docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// Regex to find document objects and extract their id and content
// We look for objects like: { id: 'd1', ..., content: '...' }
// This regex relies on the specific formatting in the file.
const regex = /\{ id: '([^']+)',(.*?)content: '([^']*)' \}/gs;

content = content.replace(regex, (match, id, middle, docContentText) => {
  // docContentText is the raw string from the source code, e.g. "## Title\\n\\nBody"
  // We need to unescape newlines to write valid markdown
  const unescapedContent = docContentText.replace(/\\n/g, '\n');
  
  const filePath = path.join(docsDir, `${id}.md`);
  fs.writeFileSync(filePath, unescapedContent, 'utf8');
  console.log(`Created ${id}.md`);
  
  // replace the content field with the path
  return `{ id: '${id}',${middle}content: '/docs/${id}.md' }`;
});

fs.writeFileSync(mockDataPath, content, 'utf8');
console.log('Updated mockData.ts');
