/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import DocumentPage from './pages/DocumentPage';
import AdminDashboard from './pages/AdminDashboard';
import SearchResults from './pages/SearchResults';
import { DataProvider } from './context/DataContext';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product/:slug" element={<ProductPage />} />
            <Route path="doc/:slug" element={<DocumentPage />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="search" element={<SearchResults />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
