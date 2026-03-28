import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Filter, FileText, Lock, ChevronRight, ArrowLeft } from 'lucide-react';
import { DocType } from '../data/mockData';
import { useData } from '../context/DataContext';
import PartnerModal from '../components/PartnerModal';

const DOC_TYPE_LABELS: Record<DocType, string> = {
  installation: 'Hướng dẫn cài đặt',
  guide: 'Hướng dẫn sử dụng',
  faq: 'Câu hỏi thường gặp',
  api: 'Tài liệu API',
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, documents: allDocuments } = useData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<DocType | 'all'>('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const product = products.find(p => p.slug === slug);
  const documents = allDocuments.filter(d => d.productId === product?.id);

  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || doc.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [documents, searchQuery, selectedType]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy sản phẩm</h2>
        <Link to="/" className="text-blue-600 hover:underline inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Về trang chủ
        </Link>
      </div>
    );
  }

  const handleDocClick = (e: React.MouseEvent, docSlug: string, isPartnerOnly: boolean) => {
    e.preventDefault();
    
    if (isPartnerOnly) {
      const isVerified = sessionStorage.getItem('isPartnerVerified') === 'true';
      if (isVerified) {
        navigate(`/doc/${docSlug}`);
      } else {
        setPendingSlug(docSlug);
        setIsModalOpen(true);
      }
    } else {
      navigate(`/doc/${docSlug}`);
    }
  };

  const handlePartnerSuccess = () => {
    setIsModalOpen(false);
    if (pendingSlug) {
      navigate(`/doc/${pendingSlug}`);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Về trang chủ
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
          <p className="text-lg text-slate-600 max-w-3xl">{product.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm tài liệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Phân loại
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedType === 'all' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  Tất cả tài liệu
                </button>
                {(Object.keys(DOC_TYPE_LABELS) as DocType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedType === type ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    {DOC_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Document List */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                {filteredDocs.length} tài liệu {selectedType !== 'all' ? `(${DOC_TYPE_LABELS[selectedType].toLowerCase()})` : ''}
              </h2>
            </div>

            {filteredDocs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200 border-dashed">
                <FileText className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-1">Không tìm thấy tài liệu</h3>
                <p className="text-slate-500">Vui lòng thử lại với từ khóa khác.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDocs.map((doc, index) => (
                  <motion.a
                    key={doc.id}
                    href={`/doc/${doc.slug}`}
                    onClick={(e) => handleDocClick(e, doc.slug, doc.isPartnerOnly)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group block bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                            {DOC_TYPE_LABELS[doc.type]}
                          </span>
                          {doc.isPartnerOnly && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              <Lock className="h-3 w-3" /> Đối tác
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-2">
                          {doc.description}
                        </p>
                      </div>
                      <div className="shrink-0 pt-2 text-slate-400 group-hover:text-blue-600 transition-colors">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <PartnerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handlePartnerSuccess} 
      />
    </div>
  );
}
