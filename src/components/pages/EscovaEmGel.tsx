import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importando corretamente o ArrowBackIcon
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import AddToCartButton from '../Cart/AddToCartButton';

const EscovaEmGel: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate(); // Inicializando useNavigate

  // Simulação de dados do produto com imageUrl
  const product = {
    id: 1,
    title: 'Escova em Gel',
    description: 'Descrição detalhada da Escova em Gel.',
    price: 'R$ 50,00',
    imageUrl: 'https://via.placeholder.com/150'  // Adicione uma URL de imagem fictícia ou real
  };

  const handleAdd = () => setQuantity(quantity + 1);
  const handleRemove = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const priceString = product.price.replace('R$', '').replace(',', '.').trim();
  const price = parseFloat(priceString);

  if (isNaN(price)) {
    return <Typography variant="h6">Preço inválido para o produto.</Typography>;
  }

  const totalPrice = price * quantity;

  return (
    <Box p={3}>
      {/* Botões de Navegação */}
      <Box mb={2} display="flex" alignItems="center">
      <IconButton 
  onClick={() => navigate('/')} //homepage
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
        <Typography variant="h4">Detalhes do Produto</Typography>
      </Box>
      
      <Card>
        <CardContent>
          <Typography variant="h5">{product.title}</Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="h4" style={{ color: 'deeppink' }}>
            Preço: {product.price}
          </Typography>

          <Box mt={2}>
            <Button variant="outlined" onClick={handleRemove}>-</Button>
            <Typography variant="h6" component="span" mx={2}>{quantity}</Typography>
            <Button variant="outlined" onClick={handleAdd}>+</Button>
          </Box>

          <Typography variant="h6" mt={2}>
            Total: R${totalPrice.toFixed(2)}
          </Typography>

          <Box mt={2}>
            <AddToCartButton 
              item={product} 
              quantity={quantity} 
              style={{ backgroundColor: 'deeppink', color: 'white' }} // Aplicando estilo
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EscovaEmGel;
