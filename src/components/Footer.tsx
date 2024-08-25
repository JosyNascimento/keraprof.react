// src/components/Footer.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#FFD700', padding: 2, textAlign: 'center' }}>
      <Typography variant="body1" color="white">
        © 2024 KeraProf. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
