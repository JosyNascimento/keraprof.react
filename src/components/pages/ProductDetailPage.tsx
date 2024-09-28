import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import AddToCartButton from '../Cart/AddToCartButton';


// Definição das interfaces
interface Item {
  id: string; 
  title: string;
  price: string; 
  descrição: string; 
  imageUrl: string;
  stock: number;
  destaque: boolean;
  description?: string; // Adicionando  se o AddToCartButton precisar
}

interface Category {
  id: string;
  title: string;
  items: Item[];
}


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
  const [product, setProduct] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const [freight, setFreight] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const categoriesRef = collection(db, "categories");
        const categoriesSnap = await getDocs(categoriesRef);
        const categories = categoriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Category[];

        // Encontrar o produto correspondente ao id
        const foundProduct = categories.flatMap(category => 
          category.items?.filter(item => item.id === id) || []
        )[0];

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error("Produto não encontrado!");
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

  if (!product) {
    return <Typography variant="h6">Produto não encontrado ou carregando...</Typography>;
  }

  const price = parseFloat(product.price); // Convertendo para número
  const totalPrice = price * quantity;

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
              backgroundColor: 'lightgray'
            }
          }}
        >
          <ArrowBack />
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            style={{ width: '100%', cursor: 'pointer' }} 
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography variant="h5">{product.title}</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {product.descrição}
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
  <AddToCartButton
    item={{
      ...product,
      description: product.descrição 
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

export default ProductDetailPage;
