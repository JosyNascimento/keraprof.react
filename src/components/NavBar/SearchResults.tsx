import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { searchProducts, Product } from '../../services/productService';

const StyledButton = styled(Button)({
  backgroundColor: 'deeppink',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkviolet',
  },
});

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get('query');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const products = await searchProducts(query);
        console.log('Produtos encontrados:', products); // Verifique os resultados aqui
        setResults(products);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <Typography variant="h6">Carregando...</Typography>;
  }

  if (results.length === 0) {
    return <Typography variant="h6">Nenhum resultado encontrado para "{query}".</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4">Resultados para: "{query}"</Typography>
      <Grid container spacing={3}>
        {results.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                {/* Adicione a imagem do produto aqui, se disponível */}
                <Typography variant="h5">{product.title}</Typography>
                <StyledButton variant="contained" onClick={() => navigate(`/product/${product.id}`)}>
                  Ver Detalhes
                </StyledButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResults;
