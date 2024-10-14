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
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import CardComponent from '../Card/CardComponent';

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
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

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

    const fetchRelatedProducts = async () => {
      const db = getFirestore();
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      
      const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRelatedProducts(products);
      console.log("Produtos relacionados:", products); // Log para verificar os produtos
    };

    const fetchCareProducts = async () => {
      const db = getFirestore();
      const categoryRef = doc(db, 'categories', 'FIPtCofN6gsaFN3xsXAF'); // Usar o ID da categoria
      const categorySnapshot = await getDoc(categoryRef);
      
      if (categorySnapshot.exists()) {
        const categoryData = categorySnapshot.data();
        console.log(categoryData); // Apenas para debug
      } else {
        console.error("Categoria não encontrada!");
      }
    };

    fetchProduct();
    fetchRelatedProducts();
    fetchCareProducts();
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

  const rawPrice = product.price;
  const price = typeof rawPrice === 'string' ? parseFloat(rawPrice.replace('R$', '').replace(',', '.').trim()) : rawPrice;

  if (isNaN(price)) {
    return <Typography variant="h6">Preço inválido: {rawPrice}</Typography>;
  }

  const totalPrice = (price * quantity).toFixed(2);

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
                Preço: R${price.toFixed(2)}
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

      <Box mt={5}>
        <Typography variant="h5" style={{ color: 'deeppink', paddingBottom: '16px' }}>
          Clientes Também Compraram
        </Typography>
        {relatedProducts.length > 0 ? (
          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={4} key={relatedProduct.id}>
                <CardComponent
                  id={relatedProduct.id}
                  title={relatedProduct.title}
                  subtitle={relatedProduct.subtitle}
                  imgSrc={relatedProduct.imageUrl}
                  price={relatedProduct.price} 
                />
              </Grid>
            ))}

            
          </Grid>
        ) : (
          <Typography variant="h6">Nenhum produto relacionado encontrado.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FeaturedProduct;
