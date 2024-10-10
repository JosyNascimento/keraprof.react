import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useCart } from '../Cart/CartContext';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // States para gerenciar os dados de pagamento
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cpf, setCpf] = useState('');
  const [installments, setInstallments] = useState(1);

  // Cálculo do total do carrinho
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace('R$', '').replace(',', '.').trim());
    return total + itemPrice * item.quantity;
  }, 0).toFixed(2);

  const handlePayment = () => {
    const orderNumber = Math.floor(Math.random() * 1000000); // Gera um número de pedido aleatório
    navigate('/payment-confirmation', { state: { orderNumber, totalPrice } }); // Navega para a página de confirmação
  };

  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ color: 'deeppink' }}>
        Página de Pagamento
      </Typography>
      <Typography variant="body1" sx={{ marginY: 2 }}>
        Total do Carrinho: R${totalPrice}
      </Typography>

      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h6">Formas de Pagamento</Typography>

          <FormControl fullWidth variant="outlined" sx={{ marginY: 2 }}>
            <InputLabel id="payment-method-label">Método de Pagamento</InputLabel>
            <Select
              labelId="payment-method-label"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              label="Método de Pagamento"
            >
              <MenuItem value="credit-card">Cartão de Crédito</MenuItem>
              <MenuItem value="pix">Pix</MenuItem>
              <MenuItem value="boleto">Boleto</MenuItem>
            </Select>
          </FormControl>

          {paymentMethod === 'credit-card' && (
            <>
              <TextField
                label="Número do Cartão"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Nome no Cartão"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Data de Validade (MM/AA)"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Código de Verificação (CVV)"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth variant="outlined" sx={{ marginY: 2 }}>
                <InputLabel id="installments-label">Quantidade de Parcelas</InputLabel>
                <Select
                  labelId="installments-label"
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  label="Quantidade de Parcelas"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} {num > 1 ? 'parcelas' : 'parcela'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {paymentMethod === 'pix' && (
            <Box sx={{ marginY: 2 }}>
              <Typography variant="body1">
                Para pagar via Pix, use os seguintes dados:
              </Typography>
              <Typography variant="body1">Chave Pix: joseildatn@gmail.com</Typography>
              <Typography variant="body1">Valor: R${totalPrice}</Typography>
              <Typography variant="body1">Banco: Banco Santander</Typography>
              <Typography variant="body1">Nome: Joseilda Nascimento</Typography>
            </Box>
          )}

          {paymentMethod === 'boleto' && (
            <Box sx={{ marginY: 2 }}>
              <Typography variant="body1">
                Gerando boleto para pagamento:
              </Typography>
              <Typography variant="body1">Valor: R${totalPrice}</Typography>
              <Typography variant="body1">Vencimento: 30/12/2024</Typography>
              <Typography variant="body1">
                O boleto será enviado para o seu e-mail.
              </Typography>
            </Box>
          )}

          <Button 
            variant="contained" 
            onClick={handlePayment} 
            sx={{ marginTop: 2, backgroundColor: 'deeppink', color: 'white', '&:hover': { backgroundColor: 'darkmagenta' } }}
          >
            Fazer Pagamento
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentPage;
