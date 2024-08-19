import React from 'react';
import NavBar from './components/NavBar';  // Importa a barra de navegação

const App: React.FC = () => {
  return (
    <div>
      <NavBar />  {/* Renderiza a barra de navegação */}
      {/* Outros componentes do seu app podem ser adicionados aqui */}
    </div>
  );
};

export default App;
