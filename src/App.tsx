import React from 'react';
import NavBar from './components/NavBar';  // Importa a barra de navegação

const App: React.FC= () => {
   {/* "React Functional Component aproveita várias funcionalidades e benefícios do TypeScript" */} 
  return (
    <div>
      <NavBar />  {/* Renderiza a barra de navegação */}
      {/* para adição de outros comomentes caso precise*/}
    </div>
  );
};

export default App;
