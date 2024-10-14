import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Slider from 'react-slick';
import { fetchProducts } from '../../services/productService';
import CardComponent from '../Card/CardComponent';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import './Catalog.css';

interface Product {
  id: number;
  title: string;
  imageUrl: string;
  price: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log("Produtos carregados:", data);
        setProducts(data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (products.length === 0) return <Typography variant="h6" align="center">Nenhum produto encontrado</Typography>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box p={1}>
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 4, color: 'black', textTransform: 'capitalize' }}>
        Produtos Selecionados Para Você
      </Typography>

      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Slider {...settings}>
          {products.map(product => (
            <div key={product.id} style={{ padding: '0 5px' }}> {/* Reduzindo o padding para responsividade */}
              <CardComponent
                id={product.id}
                title={product.title}
                subtitle=""
                imgSrc={product.imageUrl}
                price={product.price}
                sx={{ width: '100%' }} // Certificando-se de que o card ocupa 100% da largura do contêiner
              />
            </div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Catalog;
