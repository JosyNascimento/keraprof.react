//index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './components/pages/HomePage';
import NavBar from './components/NavBar'; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './components/ProductCatalog/Catalog';
import Footer from './components/Footer/Footer';
import { CartProvider } from './components/Cart/CartContext'; 
import CartPage from './components/Cart/CartPage';
import CheckoutPage from './components/pages/CheckoutPage';
import EscovaEmGel from './components/pages/EscovaEmGel';
import ProductDetailPage from './components/pages/ProductDetailPage';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);



root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/escova-em-gel" element={<EscovaEmGel />} />
              <Route path="/product/:id" element={<ProductDetailPage />} /> 
            </Routes>
          </div>
        </div>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
