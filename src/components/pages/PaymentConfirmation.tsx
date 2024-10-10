import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderNumber, totalPrice } = location.state as { orderNumber: number; totalPrice: string };

  const handleBackToHome = () => {
    navigate('/'); // Navegar para a página inicial
  };

  const handleViewOrders = () => {
    navigate('/my-orders'); // Navegar para a página de pedidos
  };

  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ color: 'deeppink' }}>
        Confirmação de Pagamento
      </Typography>
      <Typography variant="body1" sx={{ marginY: 2 }}>
        Seu pagamento foi realizado com sucesso!
      </Typography>
      <Typography variant="body1" sx={{ marginY: 1 }}>
        Número do Pedido: #{orderNumber}
      </Typography>
      <Typography variant="body1" sx={{ marginY: 1 }}>
        Total: R${totalPrice}
      </Typography>

      <Button 
        variant="contained" 
        onClick={handleBackToHome}
        sx={{ marginTop: 2, backgroundColor: 'deeppink', color: 'white', '&:hover': { backgroundColor: 'darkmagenta' } }}
      >
        Sair
      </Button>
      <Button 
        variant="outlined" 
        onClick={handleViewOrders}
        sx={{ marginTop: 2, marginLeft: 2 }}
      >
        Ver Meus Pedidos
      </Button>
    </Box>
  );
};

export default PaymentConfirmationPage;
