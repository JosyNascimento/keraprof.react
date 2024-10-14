// src/components/Cart/CartIcon.tsx

import React from 'react';
import { IconButton, Badge, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './CartContext'; // Certifique-se de que o caminho está correto
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

const CartIcon: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate(); // Hook para navegação

  // Calcula o número total de itens no carrinho
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleClick = () => {
    navigate('/cart'); // Redireciona para a página do carrinho
  };

  return (
    <Tooltip title="Meu carrinho" arrow>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default CartIcon;
