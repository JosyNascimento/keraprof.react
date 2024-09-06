
import React from 'react';
import CardComponent from '../Card/CardComponent';

const TestComponent: React.FC = () => {
  return (
    <CardComponent
      id={1}
      title="Teste"
      subtitle="Descrição teste"
      imgSrc="https://via.placeholder.com/150"
      price="R$ 99,99" // Adicionando a propriedade price
    />
  );
};

export default TestComponent;