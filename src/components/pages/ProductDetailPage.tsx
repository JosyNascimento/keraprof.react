import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, TextField, Grid, Card, CardContent, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchProductById } from '../../services/productService';
import { useCart } from '../../context/CartContext';

// Função para calcular o frete com base no CEP
const calculateFreight = (cep: string) => {
  // Tabela de frete simplificada com base no estado
  const freightRates: { [key: string]: number } = {
    'SP': 15.00,
    'RJ': 20.00,
    'MG': 25.00,
    'ES': 18.00,
    'outros': 30.00 // taxa padrão para outros estados
  };

  // Extrair o estado do CEP (assumindo que o CEP é no formato "XXXXX-XXX")
  const state = cep.slice(0, 2);

  // Retornar a taxa de frete com base no estado
  return freightRates[state] || freightRates['outros'];
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const [showPaymentTable, setShowPaymentTable] = useState(false);
  const [freight, setFreight] = useState<number | null>(null);
  const { addToCart } = useCart();

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
    const freightValue = calculateFreight(cep);
    setFreight(freightValue);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      alert(`Produto "${product.title}" adicionado ao carrinho com quantidade ${quantity}.`);
    }
  };

  const togglePaymentTable = () => setShowPaymentTable(prev => !prev);

  if (!product) {
    return <Typography variant="h6">Produto não encontrado ou carregando...</Typography>;
  }

  // Extrair o valor numérico do preço
  const priceString = product.price.replace('R$', '').replace(',', '.').trim();
  const price = parseFloat(priceString);

  if (isNaN(price)) {
    return <Typography variant="h6">Preço inválido para o produto.</Typography>;
  }

  const totalPrice = price * quantity;
  const maxInstallments = 10;

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        
        {/* Thumb-gallery */}
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            
            {/* Exibindo quatro imagens do produto */}
            {product.images?.slice(0, 4).map((image: string, index: number) => (
              <Box key={index} mb={2}>
                <img 
                  src={image} 
                  alt={`Imagem ${index + 1} do produto`} 
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
                />
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography variant="h5">{product.title}</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="h4" style={{ color: 'deeppink' }}>
                Preço: R${price.toFixed(2)}
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
                <TextField
                  label="CEP"
                  value={cep}
                  onChange={handleCepChange}
                  variant="outlined"
                  size="small"
                />
                <Button variant="contained" onClick={handleCalculateFreight}>Calcular Frete</Button>
                {freight !== null && (
                  <Typography variant="h6" mt={2}>Frete: R${freight.toFixed(2)}</Typography>
                )}
              </Box>

              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleAddToCart}>
                  Adicionar ao Carrinho
                </Button>
              </Box>

              <Box mt={4}>
                <Button variant="outlined" onClick={togglePaymentTable}>
                  {showPaymentTable ? 'Ocultar Formas de Pagamento' : 'Ver Formas de Pagamento'}
                </Button>
                <Collapse in={showPaymentTable}>
                  <Box mt={2}>
                    <Typography variant="h6">Formas de Pagamento</Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Parcelamento</TableCell>
                            <TableCell>Valor da Parcela</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[...Array(maxInstallments)].map((_, index) => {
                            const parcelCount = index + 1;
                            const parcelValue = (totalPrice / parcelCount).toFixed(2);
                            return (
                              <TableRow key={index}>
                                <TableCell>{parcelCount}x sem juros</TableCell>
                                <TableCell>R${parcelValue}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Collapse>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailPage;
