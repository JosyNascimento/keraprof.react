// src/components/pages/ForeverLiss.tsx

import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import AddToCartButton from '../Cart/AddToCartButton';

const ForeverLiss: React.FC = () => {
  const { id } = useParams(); // Obter o ID da URL
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Simulação de dados do produto
  const product = {
    id: Number(id), // Usar o ID da URL
    title: 'Kit Escova Semi Definitiva Zero 2x1Litro Forever Liss',
    description: 'A Escova Semi Definitiva Forever Liss é adorada e desejada entre os profissionais da beleza: ...',
    price: 'R$ 165,45',
    images: [
      'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/forever%20liss%2Fforeverliss.webp?alt=media&token=3c36e1e4-c66b-45e4-9acb-ad7f0cb06e21',
      'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/forever%20liss%2Fforeverliss2.webp?alt=media&token=c5020629-41b5-4d5d-9864-839ecdd9b793',
      'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/forever%20liss%2Fforeverlis%201.webp?alt=media&token=9aec61c0-39e9-49e6-b2eb-4639c5aecd60'
    ]
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
      <Box mb={2} display="flex" alignItems="center">
        <IconButton 
          onClick={() => navigate('/')}
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
              item={{ ...product, imageUrl: product.images[0] }} // Passando a primeira imagem
              quantity={quantity} 
              style={{ backgroundColor: 'deeppink', color: 'white' }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForeverLiss;
