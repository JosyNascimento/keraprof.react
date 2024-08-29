// src/components/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, TextField } from '@mui/material';

// Exemplo de dados do produto (substitua isso com a chamada à API)
const dummyProductData: Record<string, any> = {
  1: {
    title: 'Produto 1',
    description: 'Descrição geral do Produto 1.',
    itemsIncluded: 'Item 1, Item 2, Item 3',
    paymentMethods: 'Cartão, Boleto, Transferência',
    reviews: 'Ótimo produto!',
  },
  2: {
    title: 'Produto 2',
    description: 'Descrição geral do Produto 2.',
    itemsIncluded: 'Item A, Item B, Item C',
    paymentMethods: 'Cartão, Boleto, Transferência',
    reviews: 'Excelente qualidade!',
  },
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');

  useEffect(() => {
    if (id && dummyProductData[id]) {
      setProduct(dummyProductData[id]);
    } else {
      setProduct(null); // Opcional: Definir um produto padrão ou uma mensagem de erro
    }
  }, [id]);

  const handleAdd = () => setQuantity(quantity + 1);
  const handleRemove = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => setCep(e.target.value);
  const handleCalculateFreight = () => {
    alert(`Calculando frete para o CEP: ${cep}`);
  };

  if (!product) return <Typography variant="h6">Produto não encontrado ou carregando...</Typography>;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
      <Typography variant="h6">Itens Inclusos:</Typography>
      <Typography variant="body1" paragraph>
        {product.itemsIncluded}
      </Typography>
      <Typography variant="h6">Formas de Pagamento:</Typography>
      <Typography variant="body1" paragraph>
        {product.paymentMethods}
      </Typography>
      <Typography variant="h6">Avaliações:</Typography>
      <Typography variant="body1" paragraph>
        {product.reviews}
      </Typography>

      {/* Contador de Itens */}
      <Box display="flex" alignItems="center" gap={2}>
        <Button onClick={handleRemove} variant="outlined">-</Button>
        <Typography variant="h6">{quantity}</Typography>
        <Button onClick={handleAdd} variant="outlined">+</Button>
      </Box>

      {/* Simulador de Frete */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
        <TextField
          label="Digite seu CEP"
          variant="outlined"
          value={cep}
          onChange={handleCepChange}
          style={{ width: '200px' }}
        />
        <Button onClick={handleCalculateFreight} variant="contained" color="primary">
          Calcular Frete
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
