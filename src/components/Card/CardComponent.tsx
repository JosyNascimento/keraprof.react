import React from 'react';
import { Link } from 'react-router-dom';
import { Card as MuiCard, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

interface CardComponentProps {
  id: number; 
  title: string;
  subtitle: string;
  imgSrc: string;
  price: string;
  onDetailsClick?: () => void;
  sx?: React.CSSProperties; // Adicionando a propriedade `sx` para estilos personalizados
}

const CardComponent: React.FC<CardComponentProps> = ({ id, title, subtitle, imgSrc, price, onDetailsClick, sx }) => {
  // Ajustando o tratamento do preço
  const priceValue = parseFloat(price.replace('R$', '').replace('.', '').replace(',', '.'));

  if (isNaN(priceValue)) {
    console.error('Erro ao converter o preço:', price);
    return null; // Não renderiza o card se o preço não for válido
  }

  const installmentValue = (priceValue / 10).toFixed(2);
  const formattedPrice = priceValue.toFixed(2).replace('.', ',');

  return (
    <MuiCard
      sx={{
        height: 600,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        margin: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        transition: 'transform 0.3s, box-shadow 0.3s', // Adicionando transição
        '&:hover': {
          transform: 'scale(1.05)', // Aumenta o tamanho do card ao passar o mouse
          boxShadow: 6, // Aumenta a sombra do card ao passar o mouse
        },
        ...sx, // Adicionando estilos personalizados
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: '300px',
          width: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
        }}
        image={imgSrc}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ marginBottom: '8px' }}>
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'DeepPink',
              marginBottom: '4px',
              textAlign: 'center',
              fontSize: '1.25rem',
            }}
          >
            {`R$ ${formattedPrice}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'textSecondary',
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            Ou em até 10x de R$ {installmentValue} sem juros
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
            {subtitle}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component={Link}
            to={`/featured-product/${id}`}
            variant="contained"
            color="secondary"
            onClick={onDetailsClick}
            sx={{
              backgroundColor: '#e91e63',
              '&:hover': { backgroundColor: '#c2185b' },
              padding: '8px 16px',
            }}
          >
            Ver Produto
          </Button>
        </Box>
      </CardContent>
    </MuiCard>
  );
};

export default CardComponent;
