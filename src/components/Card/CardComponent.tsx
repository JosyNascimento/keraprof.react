// src/components/Card/CardComponent.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Card as MuiCard, CardContent, CardMedia, Typography, Button } from '@mui/material';

interface CardComponentProps {
  id: number;
  title: string;
  subtitle: string;
  imgSrc: string;
  onDetailsClick?: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ id, title, subtitle, imgSrc, onDetailsClick }) => {
  return (
    <MuiCard sx={{ maxWidth: 345, boxShadow: 3, margin: 1 }}>
      <CardMedia
        component="img"
        sx={{ 
          height: 290, // Ajuste a altura conforme necessário
          width: '100%', // Ajuste a largura conforme necessário
          objectFit: 'cover' // Ajuste o ajuste da imagem
        }}
        image={imgSrc}
        alt={title}
      />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </CardContent>
      <Button
        component={Link}
        to={`/product-details/${id}`}
        variant="contained"
        color="secondary"
        onClick={onDetailsClick}
        sx={{ display: 'block', margin: '0 auto', textAlign: 'center', backgroundColor: '#e91e63', '&:hover': { backgroundColor: '#c2185b' } }}
      >
        Ver Produto
      </Button>
    </MuiCard>
  );
};

export default CardComponent;
