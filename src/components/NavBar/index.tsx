import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton } from '@mui/material';
import MenuItem from './MenuItem';
import SearchBar from './SearchBar';
import logo from '../img/logok.png'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Importando o ícone do carrinho

const NavBar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#d87dab' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="Logotipo da Loja"
            sx={{
              width: 50, 
              height: 50, 
              borderRadius: '50%',
              objectFit: 'contain', // Ajusta a imagem para não distorcer
              marginRight: 1
              
           
            }} 
          />
           <Typography variant="h4" component="div" sx={{ marginRight: '20px', fontFamily: 'Roboto',  color: '#FFD700' }}>
           KeraProf
  </Typography>
</Box>

        {/* Barra de pesquisa */}
        <SearchBar />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MenuItem title="ALISAMENTO" subItems={['ESCOVA EM GEL', 'ESCOVA PROGRESSIVA','ESCOVA DEIFINITIVA', 'Escova Japonesa']} />
          <MenuItem title="LINHAS ESPECIAIS" subItems={['FORCE REPAIR', 'OLIVER OIL', 'SOS CAPILAR', 'DESMAIA CABELO']} />
          <MenuItem title="CUIDADOS PESSOAIS" subItems={['CABELO E BANHO']} />
          <MenuItem title="SKIN CARE" subItems={['CUIDAOS PARA A PELE']} />
          <MenuItem title="PRODUTOS PARA CABELO" subItems={['RECONSTRUTOR DOS FIOS', 'TRATAMENTO DE MEL', 'MATIZADOR', 'FINALIZADOR']} />

          {/* Ícone de carrinho */}
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
