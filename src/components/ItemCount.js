// src/components/ItemCount.js
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

const ItemCount = ({ initial = 1, stock = 10, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  // Função para aumentar a quantidade
  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  // Função para diminuir a quantidade
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    if (quantity <= stock) {
      onAdd(quantity);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={decreaseQuantity} 
        disabled={quantity <= 1}
      >
        -
      </Button>
      <Typography variant="h6">{quantity}</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={increaseQuantity} 
        disabled={quantity >= stock}
      >
        +
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleAddToCart} 
        disabled={stock <= 0}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default ItemCount;