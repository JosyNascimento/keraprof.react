// src/components/ProductCatalog/Arrow.tsx

import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface ArrowProps {
  className: string;
  style: React.CSSProperties;
  onClick: () => void;
}

export const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <IconButton
      className={className}
      style={{ ...style, position: 'absolute', left: 0, zIndex: 1, color: '#e91e63' }} // Cor rosa
      onClick={onClick}
    >
      <ArrowBackIos />
    </IconButton>
  );
};

export const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <IconButton
      className={className}
      style={{ ...style, position: 'absolute', right: 0, zIndex: 1, color: '#e91e63' }} // Cor rosa
      onClick={onClick}
    >
      <ArrowForwardIos />
    </IconButton>
  );
};
