// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './components/pages/HomePage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import NavBar from './components/NavBar'; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './components/ProductCatalog/Catalog';
import Footer from './components/Footer/Footer';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-details/:id" element={<ProductDetailPage />} />
        <Route path="/catalog" element={<Catalog />} />
        
        {/* Adicionar outras rotas se necessário */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();