import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/pages/HomePage'; // Certifique-se de que este caminho está correto
import ProductDetailPage from './components/pages/ProductDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar /> {/* Navegação global */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-details/:id" element={<ProductDetailPage />} />
          {/* Adicionar outras rotas aqui se necessário */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
