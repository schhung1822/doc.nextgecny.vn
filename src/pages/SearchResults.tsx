import { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, FileText, Box, ChevronRight, Lock } from 'lucide-react';
import { useData } from '../context/DataContext';
import PartnerModal from '../components/PartnerModal';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const { products, documents } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return { products: [], documents: [] };
    
    const lowerQuery = query.toLowerCase();
    
    const matchedProducts = products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery)
    );

    const matchedDocuments = documents.filter(d => 
      d.title.toLowerCase().includes(lowerQuery) || 
      d.description.toLowerCase().includes(lowerQuery)
    );

    return { products: matchedProducts, documents: matchedDocuments };
  }, [query, products, documents]);

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
    <div className="w-full min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Kết quả tìm kiếm</h1>
          <p className="text-lg text-slate-600">
            Hiển thị kết quả cho từ khóa: <span className="font-semibold text-slate-900">"{query}"</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        {!query.trim() ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 border-dashed">
            <Search className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">Nhập từ khóa để tìm kiếm</h3>
            <p className="text-slate-500">Tìm kiếm sản phẩm, tài liệu hướng dẫn và API.</p>
          </div>
        ) : results.products.length === 0 && results.documents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 border-dashed">
            <Search className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">Không tìm thấy kết quả</h3>
            <p className="text-slate-500">Vui lòng thử lại với từ khóa khác.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Products Results */}
            {results.products.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <Box className="h-5 w-5 text-blue-600" /> Sản phẩm ({results.products.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.products.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {product.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Results */}
            {results.documents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" /> Tài liệu ({results.documents.length})
                </h2>
                <div className="space-y-4">
                  {results.documents.map((doc, index) => {
                    const product = products.find(p => p.id === doc.productId);
                    return (
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
                              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                {product?.name || 'Tài liệu'}
                              </span>
                              {doc.isPartnerOnly && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
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
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <PartnerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handlePartnerSuccess} 
      />
    </div>
  );
}
