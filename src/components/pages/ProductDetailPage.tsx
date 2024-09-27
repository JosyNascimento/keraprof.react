// src/components/pages/DetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Grid, Card, CardContent, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { fetchProductById } from '../../services/productService';
import AddToCartButton from '../Cart/AddToCartButton';



const calculateFreight = (cep: string) => {
  const freightRates: { [key: string]: number } = {
    'SP': 15.00,
    'RJ': 20.00,
    'MG': 25.00,
    'ES': 18.00,
    'outros': 30.00 
  };

  const state = cep.slice(0, 2);
  return freightRates[state] || freightRates['outros'];
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const [showPaymentTable, setShowPaymentTable] = useState(false);
  const [freight, setFreight] = useState<number | null>(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate(); // Usando useNavigate

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const productId = parseInt(id, 10);
        try {
          const productDetails = await fetchProductById(productId);
          setProduct(productDetails);
        } catch (error) {
          console.error('Erro ao carregar o produto:', error);
        }
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

  const togglePaymentTable = () => setShowPaymentTable(prev => !prev);

  const handleOpenImageDialog = (image: string) => {
    setSelectedImage(image);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setSelectedImage(null);
  };

  if (!product) {
    return <Typography variant="h6">Produto não encontrado ou carregando...</Typography>;
  }

  const priceString = product.price.replace('R$', '').replace(',', '.').trim();
  const price = parseFloat(priceString);

  if (isNaN(price)) {
    return <Typography variant="h6">Preço inválido para o produto.</Typography>;
  }

  const totalPrice = price * quantity;
  const maxInstallments = 10;

  return (
    <Box p={3}>
      <Box mb={3}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/')}  // Navegação para a HomePage
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minWidth: 'unset', 
            padding: 0, 
            borderRadius: '50%', 
            width: 40, 
            height: 40,
            '&:hover': { 
              backgroundColor: 'lightgray' 
            } 
          }}
        >
          <ArrowBack />  {/* Somente ícone de seta */}
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            {product.images?.slice(0, 4).map((image: string, index: number) => (
              <Box key={index} mb={2}>
                <img 
                  src={image}
                  alt={`Imagem ${index + 1}`} 
                  style={{ width: '100%', height: 'auto', borderRadius: '8px', cursor: 'pointer' }} 
                  onClick={() => handleOpenImageDialog(image)}  
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
                <Button 
                  variant="contained" 
                  onClick={handleCalculateFreight} 
                  sx={{ backgroundColor: 'gold', color: 'black', '&:hover': { backgroundColor: 'darkgoldenrod' } }}
                >
                  OK
                </Button>
        
                {freight !== null && (
                  <Typography variant="h6" mt={2}>Frete: R${freight.toFixed(2)}</Typography>
                )}
              </Box>

              <Box mt={2}>
                <AddToCartButton item={product} quantity={quantity} />
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

      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Visualizar Imagem</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Imagem do produto"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseImageDialog} 
            sx={{ backgroundColor: '#B5A642', color: 'white', '&:hover': { backgroundColor: 'gold' } }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetailPage;