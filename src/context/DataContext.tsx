import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Category, Product, Document as Doc, initialCategories, initialProducts, initialDocuments } from '../data/mockData';
import { generateSlug } from '../lib/utils';

interface DataContextType {
  categories: Category[];
  products: Product[];
  documents: Doc[];
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addDocument: (document: Doc) => void;
  updateDocument: (document: Doc) => void;
  deleteDocument: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCategories = localStorage.getItem('ngc_categories');
    const storedProducts = localStorage.getItem('ngc_products');
    const storedDocuments = localStorage.getItem('ngc_documents');

    if (storedCategories) setCategories(JSON.parse(storedCategories));
    else setCategories(initialCategories);

    if (storedProducts) {
      const parsed = JSON.parse(storedProducts);
      setProducts(parsed.map((p: any) => ({ ...p, slug: p.slug || generateSlug(p.name) })));
    } else {
      setProducts(initialProducts);
    }

    if (storedDocuments) {
      const parsed = JSON.parse(storedDocuments);
      setDocuments(parsed.map((d: any) => ({ ...d, slug: d.slug || generateSlug(d.title) })));
    } else {
      setDocuments(initialDocuments);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ngc_categories', JSON.stringify(categories));
      localStorage.setItem('ngc_products', JSON.stringify(products));
      localStorage.setItem('ngc_documents', JSON.stringify(documents));
    }
  }, [categories, products, documents, isLoaded]);

  const addCategory = (category: Category) => setCategories(prev => [...prev, category]);
  const updateCategory = (category: Category) => setCategories(prev => prev.map(c => c.id === category.id ? category : c));
  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    // Also delete associated products and their documents
    const productsToDelete = products.filter(p => p.categoryId === id).map(p => p.id);
    setProducts(prev => prev.filter(p => p.categoryId !== id));
    setDocuments(prev => prev.filter(d => !productsToDelete.includes(d.productId)));
  };

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = (product: Product) => setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDocuments(prev => prev.filter(d => d.productId !== id));
  };

  const addDocument = (document: Doc) => setDocuments(prev => [...prev, document]);
  const updateDocument = (document: Doc) => setDocuments(prev => prev.map(d => d.id === document.id ? document : d));
  const deleteDocument = (id: string) => setDocuments(prev => prev.filter(d => d.id !== id));

  if (!isLoaded) return null;

  return (
    <DataContext.Provider value={{
      categories, products, documents,
      addCategory, updateCategory, deleteCategory,
      addProduct, updateProduct, deleteProduct,
      addDocument, updateDocument, deleteDocument
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
