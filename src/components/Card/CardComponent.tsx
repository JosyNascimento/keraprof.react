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
}

const CardComponent: React.FC<CardComponentProps> = ({ id, title, subtitle, imgSrc, price, onDetailsClick }) => {
  const priceValue = parseFloat(price.replace('R$', '').replace('.', '').replace(',', '.'));

  if (isNaN(priceValue)) {
    console.error('Erro ao converter o preço:', price);
    return null;
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
        backgroundColor: 'white', // Define o fundo do card como branco
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: '300px', // Altura fixa da imagem
          width: '100%', // Largura total do contêiner
          objectFit: 'contain', // Ajusta a imagem para caber dentro do contêiner sem distorção
          objectPosition: 'center', // Centraliza a imagem dentro do contêiner
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
