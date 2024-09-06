import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery, Drawer } from '@mui/material';
import MenuItem from './MenuItem';
import SearchBar from './SearchBar';
import logo from '../../assets/img/logok.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import '../style.css'; // Importe o arquivo CSS

const NavBar: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isLargeScreen = useMediaQuery('(min-width:780px)');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#d87dab' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex',  alignItems: 'center', flexGrow: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="Logotipo da Loja"
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                objectFit: 'contain',
                marginRight: 1
              }}
            />
            <Typography
              variant="h4"
              component="div"
              sx={{ marginRight: '20px', fontFamily: 'Roboto', color: '#FFD700', fontSize: isMobile ? '1.5rem' : '2.5rem' }}>
              KeraProf
            </Typography>
          </Box>

           {/* Centralizar a barra de pesquisa */}
        <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: isLargeScreen ? '100%' : isMobile ? '90%' : '40%' }}>
            <SearchBar />
          </Box>
        </Box>


  {/* Ícone do carrinho */}
  <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Box>

      
 {/* Menu para telas móveis */}
          {isMobile && (
            <>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
              anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ '& .MuiDrawer-paper': { width: '50%' } }} // Ajusta da largura
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
                  <SearchBar /> {/* Barra de pesquisa dentro do Drawer */}
                  <MenuItem title="ALISAMENTO" subItems={['ESCOVA EM GEL', 'ESCOVA PROGRESSIVA', 'ESCOVA DEFINITIVA', 'Escova Japonesa']} />
                  <MenuItem title="LINHAS ESPECIAIS" subItems={['FORCE REPAIR', 'OLIVER OIL', 'SOS CAPILAR', 'DESMAIA CABELO']} />
                  <MenuItem title="CUIDADOS PESSOAIS" subItems={['CABELO E BANHO']} />
                  <MenuItem title="SKIN CARE" subItems={['CUIDADOS PARA A PELE']} />
                  <MenuItem title="PRODUTOS PARA CABELO" subItems={['RECONSTRUTOR DOS FIOS', 'TRATAMENTO DE MEL', 'MATIZADOR', 'FINALIZADOR']} />
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Div separada para os itens do menu */}
      <Box sx={{ display: 'flex', color: 'white', justifyContent: 'center', backgroundColor: '#B5A642', padding: 1 }}>
        {!isMobile && (
          <>
            <MenuItem title="ALISAMENTO" subItems={['ESCOVA EM GEL', 'ESCOVA PROGRESSIVA', 'ESCOVA DEFINITIVA', 'Escova Japonesa']} />
            <MenuItem title="LINHAS ESPECIAIS" subItems={['FORCE REPAIR', 'OLIVER OIL', 'SOS CAPILAR', 'DESMAIA CABELO']} />
            <MenuItem title="CUIDADOS PESSOAIS" subItems={['CABELO E BANHO']} />
            <MenuItem title="SKIN CARE" subItems={['CUIDADOS PARA A PELE']} />
            <MenuItem title="PRODUTOS PARA CABELO" subItems={['RECONSTRUTOR DOS FIOS', 'TRATAMENTO DE MEL', 'MATIZADOR', 'FINALIZADOR']} />
          </>
        )}
      </Box>
    </>
  );
};

export default NavBar;
