// src/components/ProductCatalog/Catalog.tsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Slider from 'react-slick';
import { fetchProducts } from '../../services/productService';
import CardComponent from '../Card/CardComponent';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import './Catalog.css'; // Importe o CSS para garantir que as regras sejam aplicadas

// Definindo o tipo Product
interface Product {
  id: number;
  title: string;
  description: string;
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
        setProducts(data);
      } catch (err) {
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
      <Typography
        variant="h3"
        align="center"
        sx={{ mt: 4, mb: 4 }} // Adiciona espaçamento superior e inferior
      >
        Produtos selecionados para Você
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Slider {...settings}>
          {products.map(product => (
            <div key={product.id} style={{ padding: '0 10px' }}>
              <CardComponent
                id={product.id}
                title={product.title}
                subtitle={product.description}
                imgSrc={product.imageUrl}
                price={product.price} // Passando o preço ao CardComponent
              />
            </div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Catalog;
