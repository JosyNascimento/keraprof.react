// src/components/pages/TestComponent.tsx

import React from 'react';
import CardComponent from '../Card/CardComponent';

const TestComponent: React.FC = () => {
  return <CardComponent id={1} title="Teste" subtitle="Descrição teste" imgSrc="https://via.placeholder.com/150" />;
};

export default TestComponent;