import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { fetchProductById, Product } from '../../services/productService';
import AddToCartButton from '../Cart/AddToCartButton';

const calculateFreight = (cep: string) => {
  const freightRates: { [key: string]: number } = {
    'SP': 15.00,
    'RJ': 20.00,
    'MG': 25.00,
    'ES': 18.00,
    'outros': 30.00,
  };
  const state = cep.slice(0, 2);
  return freightRates[state] || freightRates['outros'];
};

const FeaturedProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const [freight, setFreight] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productData = await fetchProductById(Number(id));
        if (productData) {
          setProduct(productData);
          setSelectedImage(productData.imageUrl);
        } else {
          console.error("Produto não encontrado!");
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleAdd = () => setQuantity(quantity + 1);
  const handleRemove = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => setCep(e.target.value);
  const handleCalculateFreight = () => {
    const freightValue = calculateFreight(cep);
    setFreight(freightValue);
  };

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  if (!product) {
    return <Typography variant="h6">Produto não encontrado ou carregando...</Typography>;
  }

  const price = parseFloat(product.price.replace('R$', '').replace(',', '.').trim());
  if (isNaN(price)) {
    return <Typography variant="h6">Preço inválido: {product.price}</Typography>;
  }

  const totalPrice = (price * quantity).toFixed(2);

  // Função para dividir a descrição em parágrafos
  const renderDescription = (description: string) => {
    return description.split('.').map((para, index) => (
      <Typography key={index} variant="body1" color="textSecondary" gutterBottom sx={{ textAlign: 'justify' }}>
        {para.trim()}{index < description.split('.').length - 1 && '.'} 
      </Typography>
    ));
  };

  return (
    <Box p={3}>
      <Box mb={3}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/')}
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
              backgroundColor: 'lightgray',
            },
          }}
        >
          <ArrowBack />
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <Box position="relative" display="flex" justifyContent="center" alignItems="center" height="400px">
            <img 
              src={selectedImage} 
              alt={product.title} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain', 
                cursor: 'pointer' 
              }} 
            />
          </Box>

          {/* Renderizar as imagens adicionais */}
          <Box display="flex" justifyContent="center" mt={2}>
            {product.images.map((imageUrl, index) => (
              <img 
                key={index} 
                src={imageUrl} 
                alt={`Thumbnail ${index}`} 
                style={{ 
                  width: 80, 
                  height: 80, 
                  margin: '0 5px', 
                  cursor: 'pointer', 
                  border: selectedImage === imageUrl ? '2px solid deeppink' : 'none' 
                }} 
                onClick={() => handleThumbnailClick(imageUrl)} 
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} sm={7}>
          <Card>
            <CardContent>
              <Typography variant="h4" style={{ color: 'deeppink', paddingBottom: '16px' }}>
                {product.title}
              </Typography>
              
              {/* Renderização da descrição com quebras de linha */}
              {renderDescription(product.description)}

              {product.usageInstructions && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Modo de Uso: {product.usageInstructions}
                </Typography>
              )}
              {product.productsToReceive && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Produtos a Receber: {product.productsToReceive}
                </Typography>
              )}
              <Typography variant="h4" style={{ color: 'deeppink' }}>
                Preço: {product.price}
              </Typography>

              <Box mt={2} display="flex" alignItems="center">
                <Button variant="outlined" onClick={handleRemove}>-</Button>
                <Typography variant="h6" component="span" mx={2}>{quantity}</Typography>
                <Button variant="outlined" onClick={handleAdd}>+</Button>
              </Box>

              <Typography variant="h6" mt={2}>
                Total: R${totalPrice}
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
                <AddToCartButton
                  item={{
                    ...product,
                    id: product.id,
                    description: product.description,
                  }}
                  quantity={quantity}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedProduct;
