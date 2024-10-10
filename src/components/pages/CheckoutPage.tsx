import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';

const CheckoutPage: React.FC = () => {
  const { cart } = useCart();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleRegisterChange = () => {
    setRegister(prev => !prev);
  };

  const handleCheckout = () => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    navigate('/payment'); // Navegar para a página de pagamento
  };

  const handleContinueShopping = () => {
    navigate('/'); // Navegar para a página inicial
  };

  return (
    <Box p={3}>
      <Box mb={2} display="flex" alignItems="center">
        <Typography variant="h4" sx={{ color: 'deeppink' }}>
          Detalhes do seu Pedido
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2} sx={{ color: '#B5A642' }}>
            Carrinho
          </Typography>
          {cart.length === 0 ? (
            <Typography variant="body1">Seu carrinho está vazio.</Typography>
          ) : (
            <Box>
              {cart.map(item => (
                <Box key={item.id} mb={2}>
                  <Typography variant="body1">{item.title} - {item.quantity} x R${item.price}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <Box mt={3}>
        <FormControlLabel
          control={<Checkbox checked={register} onChange={handleRegisterChange} />}
          label="Desejo criar uma conta ou usar uma existente"
        />
      </Box>

      {register && (
        <Box mt={3}>
          <Typography variant="h6">Cadastro</Typography>
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Box>
      )}

      <Box mt={3}>
        <Typography variant="h6">Informações de Contato</Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
      </Box>

      <Box mt={3} display="flex" gap={2}>
        <Button 
          variant="contained" 
          onClick={handleContinueShopping}
          sx={{ 
            backgroundColor: '#B5A642;', 
            color: 'white', 
            '&:hover': { backgroundColor: 'darkgrey' }, 
            fontSize: '0.875rem',
            padding: '8px 16px',
            minWidth: 'unset',
          }}
        >
          Continuar Comprando
        </Button>
        <Button 
          variant="contained" 
          onClick={handleCheckout}
          sx={{ 
            backgroundColor: 'deeppink', 
            color: 'white', 
            '&:hover': { backgroundColor: 'darkmagenta' }, 
            fontSize: '0.875rem',
            padding: '8px 16px',
            minWidth: 'unset',
          }}
        >
          Finalizar Compra
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
