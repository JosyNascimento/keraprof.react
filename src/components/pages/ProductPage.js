import React from 'react';
import ItemCount from './ItemCount';

const ProductPage = () => {
  // Função para lidar com a adição ao carrinho
  const handleAddToCart = (quantity) => {
    console.log(`Added ${quantity} items to the cart.`);
    // Aqui você pode adicionar a lógica para adicionar os itens ao carrinho
  };

  return (
    <div>
      <h1>Product Name</h1>
      <p>Product Description</p>
      <ItemCount initial={1} stock={10} onAdd={handleAddToCart} />
    </div>
  );
};

export default ProductPage;