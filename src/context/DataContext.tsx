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

const STORAGE_KEYS = {
  version: 'ngc_data_version',
  categories: 'ngc_categories',
  products: 'ngc_products',
  documents: 'ngc_documents',
};

const normalizeProducts = (items: Product[]) =>
  items.map((product) => ({ ...product, slug: product.slug || generateSlug(product.name) }));

const normalizeDocuments = (items: Doc[]) =>
  items.map((document) => ({ ...document, slug: document.slug || generateSlug(document.title) }));

const createSeedVersion = () => {
  const rawSeed = JSON.stringify({
    categories: initialCategories,
    products: normalizeProducts(initialProducts),
    documents: normalizeDocuments(initialDocuments),
  });

  let hash = 0;
  for (let index = 0; index < rawSeed.length; index += 1) {
    hash = (hash * 31 + rawSeed.charCodeAt(index)) >>> 0;
  }

  return `seed_${hash.toString(36)}`;
};

const DATA_SEED_VERSION = createSeedVersion();

const readStoredValue = <T,>(key: string): T | null => {
  const rawValue = localStorage.getItem(key);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedVersion = localStorage.getItem(STORAGE_KEYS.version);
    const canReuseStoredData = storedVersion === DATA_SEED_VERSION;

    if (!canReuseStoredData) {
      localStorage.removeItem(STORAGE_KEYS.categories);
      localStorage.removeItem(STORAGE_KEYS.products);
      localStorage.removeItem(STORAGE_KEYS.documents);
    }

    const storedCategories = canReuseStoredData
      ? readStoredValue<Category[]>(STORAGE_KEYS.categories)
      : null;
    const storedProducts = canReuseStoredData
      ? readStoredValue<Product[]>(STORAGE_KEYS.products)
      : null;
    const storedDocuments = canReuseStoredData
      ? readStoredValue<Doc[]>(STORAGE_KEYS.documents)
      : null;

    setCategories(storedCategories ?? initialCategories);
    setProducts(storedProducts ? normalizeProducts(storedProducts) : normalizeProducts(initialProducts));
    setDocuments(storedDocuments ? normalizeDocuments(storedDocuments) : normalizeDocuments(initialDocuments));

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.version, DATA_SEED_VERSION);
      localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.documents, JSON.stringify(documents));
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
