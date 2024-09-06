// src/components/Card/CardComponent.tsx

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
  // Calcula o valor da parcela
  const priceValue = parseFloat(price.replace('R$', '').replace(',', '.')); // Converte o preço para número
  const installmentValue = (priceValue / 10).toFixed(2); // Divide por 10 e formata com duas casas decimais

  return (
    <MuiCard
      sx={{
        height: 600, // Define a altura fixa do cartão
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        margin: 1,
        overflow: 'hidden' // Garante que o conteúdo não saia do cartão
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 300, // Altura fixa da imagem
          width: '100%', // Largura total do contêiner
          objectFit: 'cover' // Ajusta a imagem para cobrir o contêiner sem distorção
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
              color: 'DeepPink', // Cor DeepPink
              marginBottom: '4px', // Espaçamento abaixo do preço
              textAlign: 'center', // Centraliza o preço
              fontSize: '1.25rem' // Aumenta o tamanho da fonte
            }}
          >
            {price}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'textSecondary',
              textAlign: 'center',
              marginBottom: '16px' // Espaçamento abaixo da parcela
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
            to={`/product-details/${id}`}
            variant="contained"
            color="secondary"
            onClick={onDetailsClick}
            sx={{
              backgroundColor: '#e91e63',
              '&:hover': { backgroundColor: '#c2185b' },
              padding: '8px 16px'
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
