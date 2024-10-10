import React from 'react';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import { useCart } from './CartContext'; // Importando o contexto do carrinho

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate(); // Inicializando useNavigate

  const handleCheckout = () => {
    // Lógica para proceder para a página de checkout ou finalização de compra
    navigate('/checkout'); // Atualize o caminho conforme a sua configuração de rotas
  };

  return (
    <Box p={3}>
      {/* Botões de Navegação */}
      <Box mb={2} display="flex" alignItems="center">
        <IconButton 
          onClick={() => { 
            navigate(-1); 
          }} 
          size="large"
          aria-label="Voltar"
          sx={{ 
            color: 'deeppink', 
            '&:hover': { color: 'darkmagenta' }, 
            marginRight: 2
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        {/* Título "Carrinho" em dourado */}
        <Typography variant="h4" sx={{ color: '#B5A642;' }}>
          Carrinho
        </Typography> 
      </Box>
      
      <Box sx={{ padding: 2 }}>
        {/* "Seu Carrinho" em deeppink */}
        <Typography variant="h4" sx={{ color: 'deeppink' }} gutterBottom>
          Seu Carrinho
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="h6">Seu carrinho está vazio.</Typography>
        ) : (
          <>
            {cart.map(item => (
              <Box key={item.id} sx={{ marginBottom: 2 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1">Quantidade: {item.quantity}</Typography>
                <Typography variant="body1">Preço: {item.price}</Typography>
                {/* Estilo personalizado para o botão Remover */}
                <Button 
                  onClick={() => removeFromCart(item.id)} 
                  sx={{ color: 'deeppink', '&:hover': { color: 'darkmagenta' }}}
                >
                  Remover
                </Button>
                <Divider sx={{ marginY: 1 }} />
              </Box>
            ))}
            {/* Estilo personalizado para o botão Finalizar Compra */}
            <Button 
              variant="contained" 
              sx={{ backgroundColor: 'deeppink', color: 'white', '&:hover': { backgroundColor: 'lightpink' } }} 
              onClick={handleCheckout}
            >
              Finalizar Compra
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
