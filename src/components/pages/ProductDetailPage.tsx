import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { fetchProductById } from '../../services/productService';
import { useCart } from '../../context/CartContext'; // Supondo que você tenha um contexto de carrinho

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const { addToCart } = useCart(); // Função do contexto para adicionar ao carrinho

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const productId = parseInt(id, 10);
        const productDetails = await fetchProductById(productId);
        setProduct(productDetails);
      }
    };

    loadProduct();
  }, [id]);

  const handleAdd = () => setQuantity(quantity + 1);
  const handleRemove = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => setCep(e.target.value);
  const handleCalculateFreight = () => {
    alert(`Calculando frete para o CEP: ${cep}`);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity }); // Adiciona ao carrinho usando o contexto
      alert(`Produto "${product.title}" adicionado ao carrinho com quantidade ${quantity}.`);
    }
  };

  if (!product) return <Typography variant="h6">Produto não encontrado ou carregando...</Typography>;

  return (
    <Box p={2}>
      {/* Título e descrição */}
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {product.description || 'Descrição do produto não disponível.'}
      </Typography>

      {/* Exibição de imagens do produto */}
      <Grid container spacing={2} justifyContent="center">
        {product.images?.map((image: string, index: number) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <img 
              src={image} 
              alt={`Imagem ${index + 1} do produto`} 
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
            />
          </Grid>
        ))}
      </Grid>

      {/* Itens inclusos, formas de pagamento, e avaliações */}
      <Typography variant="h6" mt={2}>Itens Inclusos:</Typography>
      <Typography variant="body1" paragraph>
        {product.itemsIncluded || '2x 1Litro Shampoo + escova semi definitiva'}
      </Typography>
      <Typography variant="h6">Formas de Pagamento:</Typography>
      <Typography variant="body1" paragraph>
        {product.paymentMethods || 'Pix, Boleto ou 10x Sem juros no Cartão'}
      </Typography>
      <Typography variant="h6">Avaliações:</Typography>
      <Typography variant="body1" paragraph>
        {product.reviews || 'Não especificado'}
      </Typography>

      {/* Preço do produto */}
      <Typography variant="h5" mt={2} align="center">
        Preço: {product.price}
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

      {/* Botão Adicionar ao Carrinho */}
      <Box mt={2}>
        <Button onClick={handleAddToCart} variant="contained" color="secondary">
          Adicionar ao Carrinho
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
