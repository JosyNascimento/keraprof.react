import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

interface AddToCartButtonProps {
  item: { 
    id: number; 
    title: string; 
    price: string; 
    imageUrl: string; 
    description: string; 
  }; 
  quantity: number;
  style?: React.CSSProperties; // Adiciona prop de estilo opcional
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item, quantity, style }) => {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate(); // Usando useNavigate

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    addToCart({ ...item, quantity }); // Adiciona o item ao carrinho com a quantidade selecionada
    setOpen(true); // Abre o Snackbar
    setAnchorEl(event.currentTarget); // Define o botão como o âncora para o Snackbar
    setTimeout(() => navigate('/checkout'), 2000); // Navega para a página de checkout após 2 segundos
  };

  const handleClose = () => {
    setOpen(false); // Fecha o Snackbar
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: 'deeppink', '&:hover': { backgroundColor: 'darkmagenta' } }} // Cor do botão
        onClick={handleClick}
        style={style} // Aplica o estilo passado como prop
      >
        Adicionar ao Carrinho
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Posição à direita do botão
        sx={{ 
          '& .MuiSnackbarContent-root': {
            marginTop: '10px', // Ajusta a margem superior para a posição correta
            marginRight: '10px' // Ajusta a margem direita para alinhar próximo ao botão
          } 
        }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Produto adicionado ao carrinho!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToCartButton;
