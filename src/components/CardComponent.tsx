// src/components/CardComponent.tsx
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
    <MuiCard sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="240"
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
        to={`/product-details/${id}`} // Utilize o ID do produto na URL
        variant="contained"
        color="primary"
        onClick={onDetailsClick} // Adicione a função de clique se necessário
      >
        Ver Detalhes
      </Button>
    </MuiCard>
  );
};

export default CardComponent;
