import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useData } from '../context/DataContext';
import PartnerModal from '../components/PartnerModal';
import { ChevronLeft, Share2, Mail, Link as LinkIcon, Lock, Check, X, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { getDocumentContentCandidates, getDocumentPath } from '../lib/utils';

export default function DocumentPage() {
  const { productSlug, docSlug } = useParams<{ productSlug?: string; docSlug?: string }>();
  const navigate = useNavigate();
  const { products, documents } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  const routeProduct = productSlug ? products.find((item) => item.slug === productSlug) ?? null : null;
  const doc = productSlug
    ? routeProduct
      ? documents.find((item) => item.slug === docSlug && item.productId === routeProduct.id) ?? null
      : null
    : documents.find((item) => item.slug === docSlug) ?? null;
  const product = doc ? products.find((item) => item.id === doc.productId) ?? null : null;
  const relatedDocs = product ? documents.filter((item) => item.productId === product.id && item.id !== doc?.id) : [];
  const canonicalPath = product ? getDocumentPath(product.slug, doc?.slug) : null;

  const [content, setContent] = useState('');
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  useEffect(() => {
    if (!doc) {
      setContent('');
      setIsLoadingContent(false);
      return;
    }

    const contentCandidates = getDocumentContentCandidates(product?.slug, doc.slug, doc.content);
    if (contentCandidates.length === 0) {
      setContent(doc.content);
      setIsLoadingContent(false);
      return;
    }

    let isCancelled = false;

    const loadDocumentContent = async () => {
      setIsLoadingContent(true);

      for (const contentPath of contentCandidates) {
        try {
          const separator = contentPath.includes('?') ? '&' : '?';
          const requestUrl = import.meta.env.DEV
            ? `${contentPath}${separator}v=${Date.now()}`
            : contentPath;
          const response = await fetch(requestUrl, { cache: 'no-store' });

          if (!response.ok) {
            continue;
          }

          const text = await response.text();
          if (text.trim().toLowerCase().startsWith('<!doctype html>')) {
            continue;
          }

          if (!isCancelled) {
            setContent(text);
            setIsLoadingContent(false);
          }
          return;
        } catch {
          continue;
        }
      }

      if (!isCancelled) {
        const attemptedPaths = contentCandidates.map((path) => `\`${path}\``).join(', ');
        setContent(`# Loi tai tai lieu\nKhong the tai noi dung tu ${attemptedPaths}.`);
        setIsLoadingContent(false);
      }
    };

    void loadDocumentContent();

    return () => {
      isCancelled = true;
    };
  }, [doc, product]);

  useEffect(() => {
    if (doc && product && (!productSlug || productSlug !== product.slug)) {
      navigate(getDocumentPath(product.slug, doc.slug), { replace: true });
    }
  }, [doc, product, productSlug, navigate]);

  useEffect(() => {
    if (doc?.isPartnerOnly) {
      const verified = sessionStorage.getItem('isPartnerVerified') === 'true';
      if (verified) {
        setIsVerified(true);
      } else {
        setIsModalOpen(true);
      }
    } else {
      setIsVerified(true);
    }
  }, [doc]);

  if (!doc || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy tài liệu</h2>
        <Link to="/" className="text-blue-600 hover:underline inline-flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" /> Về trang chủ
        </Link>
      </div>
    );
  }

  if (canonicalPath && productSlug && productSlug !== product.slug) {
    return null;
  }

  const handlePartnerSuccess = () => {
    setIsModalOpen(false);
    setIsVerified(true);
  };

  const handlePartnerClose = () => {
    setIsModalOpen(false);
    navigate(`/product/${product.slug}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const extractHeadings = (markdownContent: string) => {
    const extractedHeadings: { level: number; text: string; id: string }[] = [];
    const regex = /^(#{2,3})\s+(.+)$/gm;
    let match;
    let h2Count = 0;
    let h3Count = 0;

    while ((match = regex.exec(markdownContent)) !== null) {
      const level = match[1].length;
      if (level === 2) {
        h2Count += 1;
        h3Count = 0;
        extractedHeadings.push({ level, text: match[2], id: `section-${h2Count}` });
      } else {
        h3Count += 1;
        extractedHeadings.push({ level, text: match[2], id: `section-${h2Count}-${h3Count}` });
      }
    }

    return extractedHeadings;
  };

  const headings = extractHeadings(content);
  const headingIdMap = new Map(headings.map((heading) => [heading.text, heading.id]));

  const handleTocClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (doc.isPartnerOnly && !isVerified) {
    return (
      <div className="flex-1 bg-slate-50 flex items-center justify-center py-20">
        <PartnerModal
          isOpen={isModalOpen}
          onClose={handlePartnerClose}
          onSuccess={handlePartnerSuccess}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="border-b border-slate-200 bg-slate-50/50">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-6">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <ChevronLeft className="mx-2 h-4 w-4 rotate-180 text-slate-300" />
            <Link to={`/product/${product.slug}`} className="hover:text-blue-600 transition-colors line-clamp-1 max-w-[200px] md:max-w-none">
              {product.name}
            </Link>
            <ChevronLeft className="mx-2 h-4 w-4 rotate-180 text-slate-300" />
            <span className="text-slate-900 line-clamp-1">{doc.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {doc.isPartnerOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                    <Lock className="h-3.5 w-3.5" /> Dành cho Đối tác
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  {doc.type.toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                {doc.title}
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl">
                {doc.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyLink}
                className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                title="Sao chép liên kết"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <LinkIcon className="h-4 w-4" />}
              </button>
              <a
                href={`mailto:?subject=${encodeURIComponent(doc.title)}&body=${encodeURIComponent(window.location.href)}`}
                className="flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                title="Chia sẻ qua Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <button
                className="flex items-center justify-center h-10 px-4 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all gap-2"
              >
                <Share2 className="h-4 w-4" /> Chia sẻ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-slate prose-blue max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:rounded-xl prose-pre:shadow-sm prose-img:rounded-xl prose-img:shadow-sm"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ node, ...props }) => {
                    const text = props.children?.toString() || '';
                    const id = headingIdMap.get(text) || text.toLowerCase().replace(/[^\w]+/g, '-');
                    return <h2 id={id} {...props} />;
                  },
                  h3: ({ node, ...props }) => {
                    const text = props.children?.toString() || '';
                    const id = headingIdMap.get(text) || text.toLowerCase().replace(/[^\w]+/g, '-');
                    return <h3 id={id} {...props} />;
                  },
                  img: ({ node, ...props }) => {
                    if (props.src?.endsWith('.mp4') || props.src?.endsWith('.webm')) {
                      return (
                        <video controls className="w-full rounded-xl shadow-sm my-8">
                          <source src={props.src} type={`video/${props.src.split('.').pop()}`} />
                          Trình duyệt của bạn không hỗ trợ thẻ video.
                        </video>
                      );
                    }

                    return (
                      <img
                        {...props}
                        onClick={() => setZoomedImg(props.src || null)}
                        className="cursor-zoom-in hover:opacity-90 transition-opacity"
                      />
                    );
                  },
                }}
              >
                {isLoadingContent ? 'Đang tải nội dung...' : content}
              </ReactMarkdown>
            </motion.div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
              <p>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
              <button className="text-blue-600 hover:underline">Báo lỗi tài liệu</button>
            </div>
          </div>

          <div className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-28 flex flex-col gap-8">
              {headings.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Nội dung chính
                  </p>
                  <ul className="border-l border-slate-200 pl-4 space-y-0.5 text-sm">
                    {headings.map((heading, index) => (
                      <li key={index} className={heading.level === 3 ? 'ml-3' : ''}>
                        <a
                          href={`#${heading.id}`}
                          onClick={(event) => handleTocClick(event, heading.id)}
                          className="block py-1.5 text-slate-500 hover:text-blue-600 transition-colors leading-snug cursor-pointer"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {relatedDocs.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Tài liệu liên quan
                    </span>
                    <span className="text-indigo-500 font-bold">{relatedDocs.length}</span>
                  </p>
                  <ul className="space-y-1 text-sm">
                    {relatedDocs.map((relatedDoc) => (
                      <li key={relatedDoc.id}>
                        <Link
                          to={getDocumentPath(product.slug, relatedDoc.slug)}
                          className="flex items-center gap-2.5 py-1.5 text-slate-500 hover:text-indigo-600 transition-colors group"
                        >
                          <FileText className="h-3.5 w-3.5 shrink-0 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                          <span className="line-clamp-2 leading-snug">{relatedDoc.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <p className="text-sm font-semibold text-slate-700 mb-1">Cần hỗ trợ?</p>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">Đội kỹ thuật luôn sẵn sàng giúp bạn.</p>
                <a
                  href="mailto:support@nextgency.vn"
                  className="block text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-colors"
                >
                  Liên hệ ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {zoomedImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setZoomedImg(null)}
        >
          <img
            src={zoomedImg}
            alt="Phóng to"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
          />
          <button
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            onClick={(event) => {
              event.stopPropagation();
              setZoomedImg(null);
            }}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
