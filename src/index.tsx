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
import { CartProvider } from './components/Cart/CartContext'; // Importa o CartProvider
import CartPage from './components/Cart/CartPage';
import CheckoutPage from './components/pages/CheckoutPage';
import EscovaEmGel from './components/pages/EscovaEmGel';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCGe3hII4Q3WqIy2vM54sQD5x8-LCYuqy0",

  authDomain: "keraprofreact.firebaseapp.com",

  projectId: "keraprofreact",

  storageBucket: "keraprofreact.appspot.com",

  messagingSenderId: "878322506214",

  appId: "1:878322506214:web:bcc418a5be3386fd2a5e27",

  measurementId: "G-1FPVQHLLR5"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);



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
              <Route path="/product-details/:id" element={<ProductDetailPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} /> {/*rota do carrinho */}
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/escova-em-gel" element={<EscovaEmGel />} />
              {/*outras rotas se necessário */}
            </Routes>
          </div>
        </div>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
