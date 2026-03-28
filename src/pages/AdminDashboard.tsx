import { useState } from 'react';
import { useData } from '../context/DataContext';
import { DocType } from '../data/mockData';
import { Plus, Edit2, Trash2, Folder, Box, FileText, X } from 'lucide-react';

export default function AdminDashboard() {
  const { 
    categories, products, documents,
    addCategory, updateCategory, deleteCategory,
    addProduct, updateProduct, deleteProduct,
    addDocument, updateDocument, deleteDocument
  } = useData();

  const [activeTab, setActiveTab] = useState<'categories' | 'products' | 'documents'>('documents');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form states
  const [formData, setFormData] = useState<any>({});

  const openModal = (item?: any) => {
    setEditingItem(item || null);
    if (item) {
      setFormData({ ...item });
    } else {
      // Initialize empty form based on active tab
      if (activeTab === 'categories') setFormData({ name: '', description: '' });
      if (activeTab === 'products') setFormData({ name: '', description: '', categoryId: categories[0]?.id || '', icon: 'Box' });
      if (activeTab === 'documents') setFormData({ title: '', description: '', type: 'guide', isPartnerOnly: false, productId: products[0]?.id || '', content: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const generateSlug = (text: string) => {
    if (!text) return '';
    return text.toString().toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingItem?.id || `new_${Date.now()}`;
    
    const baseText = activeTab === 'documents' ? formData.title : formData.name;
    const slug = editingItem?.slug || generateSlug(baseText || '');
    
    const itemToSave = activeTab === 'categories' 
      ? { ...formData, id } 
      : { ...formData, id, slug };

    if (activeTab === 'categories') {
      editingItem ? updateCategory(itemToSave) : addCategory(itemToSave);
    } else if (activeTab === 'products') {
      editingItem ? updateProduct(itemToSave) : addProduct(itemToSave);
    } else if (activeTab === 'documents') {
      editingItem ? updateDocument(itemToSave) : addDocument(itemToSave);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (activeTab === 'categories') deleteCategory(id);
    else if (activeTab === 'products') deleteProduct(id);
    else if (activeTab === 'documents') deleteDocument(id);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Quản trị Hệ thống</h1>
          <p className="text-slate-600">Quản lý danh mục, sản phẩm và tài liệu hướng dẫn.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Plus className="h-4 w-4" /> Thêm mới
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8">
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${activeTab === 'categories' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
        >
          <Folder className="h-4 w-4" /> Danh mục
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${activeTab === 'products' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
        >
          <Box className="h-4 w-4" /> Sản phẩm
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${activeTab === 'documents' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
        >
          <FileText className="h-4 w-4" /> Tài liệu
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {activeTab === 'categories' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Tên danh mục</th>
                <th className="px-6 py-4 font-medium">Mô tả</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{cat.name}</td>
                  <td className="px-6 py-4 text-slate-500">{cat.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal(cat)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">Chưa có danh mục nào</td></tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'products' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Tên sản phẩm</th>
                <th className="px-6 py-4 font-medium">Danh mục</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(prod => {
                const category = categories.find(c => c.id === prod.categoryId);
                return (
                  <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{prod.name}</td>
                    <td className="px-6 py-4 text-slate-500">{category?.name || '---'}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openModal(prod)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(prod.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">Chưa có sản phẩm nào</td></tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'documents' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Tên tài liệu</th>
                <th className="px-6 py-4 font-medium">Sản phẩm</th>
                <th className="px-6 py-4 font-medium">Loại</th>
                <th className="px-6 py-4 font-medium">Quyền</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map(doc => {
                const product = products.find(p => p.id === doc.productId);
                return (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 line-clamp-1">{doc.title}</td>
                    <td className="px-6 py-4 text-slate-500">{product?.name || '---'}</td>
                    <td className="px-6 py-4 text-slate-500 uppercase text-xs">{doc.type}</td>
                    <td className="px-6 py-4">
                      {doc.isPartnerOnly ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Đối tác</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">Công khai</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openModal(doc)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(doc.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {documents.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Chưa có tài liệu nào</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingItem ? 'Chỉnh sửa' : 'Thêm mới'} {activeTab === 'categories' ? 'Danh mục' : activeTab === 'products' ? 'Sản phẩm' : 'Tài liệu'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {activeTab === 'categories' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tên danh mục</label>
                    <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                    <textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none min-h-[100px]" />
                  </div>
                </>
              )}

              {activeTab === 'products' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tên sản phẩm</label>
                    <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Danh mục</label>
                    <select required value={formData.categoryId || ''} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none bg-white">
                      <option value="">Chọn danh mục</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                    <textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none min-h-[80px]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Icon (Lucide React name)</label>
                    <input required type="text" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none" placeholder="VD: Box, Smartphone, LayoutTemplate" />
                  </div>
                </>
              )}

              {activeTab === 'documents' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề tài liệu</label>
                    <input required type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Sản phẩm</label>
                      <select required value={formData.productId || ''} onChange={e => setFormData({...formData, productId: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none bg-white">
                        <option value="">Chọn sản phẩm</option>
                        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Loại tài liệu</label>
                      <select required value={formData.type || 'guide'} onChange={e => setFormData({...formData, type: e.target.value as DocType})} className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none bg-white">
                        <option value="installation">Hướng dẫn cài đặt</option>
                        <option value="guide">Hướng dẫn sử dụng</option>
                        <option value="faq">Câu hỏi thường gặp</option>
                        <option value="api">Tài liệu API</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả ngắn</label>
                    <input required type="text" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                      <input type="checkbox" checked={formData.isPartnerOnly || false} onChange={e => setFormData({...formData, isPartnerOnly: e.target.checked})} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      Yêu cầu mã xác minh (Dành cho Đối tác)
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Đường dẫn File Nội dung</label>
                    <input required type="text" value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 outline-none text-sm" placeholder="vd: /docs/d1.md" />
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
