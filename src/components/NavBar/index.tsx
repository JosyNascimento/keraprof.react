// src/components/NavBar.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery, Drawer } from '@mui/material';
import MenuItem from './MenuItem';
import SearchBar from './SearchBar';
import logo from '../../assets/img/logok.png';
import MenuIcon from '@mui/icons-material/Menu';
import CartIcon from '../Cart/CartIcon';
import CartPage from '../Cart/CartPage';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleCartDrawer = (open: boolean) => () => {
    setCartDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#d87dab' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="Logotipo da Loja"
              sx={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'contain', marginRight: 1 }}
            />
            <Typography
              variant="h4"
              component="div"
              sx={{ marginRight: '20px', fontFamily: 'Roboto', color: '#FFD700', fontSize: isMobile ? '1.5rem' : '2.5rem' }}>
              KeraProf
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: isMobile ? '90%' : '100%' }}>
              <SearchBar onSearchResults={(results) => console.log(results)} isMobile={isMobile} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
              <CartIcon />
            </IconButton>
          </Box>

          {isMobile && (
            <>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ '& .MuiDrawer-paper': { width: '50%' } }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
                  <SearchBar onSearchResults={(results) => console.log(results)} isMobile={isMobile} />
                  <MenuItem 
                    title="ALISAMENTO" 
                    subItems={[
                      { title: 'ESCOVA EM GEL', link: '/escova-em-gel' },
                      { title: 'ESCOVA PROGRESSIVA', link: '/escova-progressiva' },
                      { title: 'ESCOVA DEFINITIVA', link: '/escova-definitiva' },
                      { title: 'ESCOVA JAPONESA', link: '/escova-japonesa' }
                    ]} 
                  />
                  <MenuItem 
                    title="LINHAS ESPECIAIS" 
                    subItems={[
                      { title: 'FORCE REPAIR', link: '/force-repair' },
                      { title: 'OLIVER OIL', link: '/oliver-oil' },
                      { title: 'SOS CAPILAR', link: '/sos-capilar' },
                      { title: 'DESMAIA CABELO', link: '/desmaia-cabelo' }
                    ]} 
                  />
                  <MenuItem 
                    title="CUIDADOS PESSOAIS" 
                    subItems={[
                      { title: 'CABELO E BANHO', link: '/cabelo-e-banho' }
                    ]} 
                  />
                  <MenuItem 
                    title="SKIN CARE" 
                    subItems={[
                      { title: 'CUIDADOS PARA A PELE', link: '/cuidados-para-a-pele' }
                    ]} 
                  />
                  <MenuItem 
                    title="PRODUTOS PARA CABELO" 
                    subItems={[
                      { title: 'RECONSTRUTOR DOS FIOS', link: '/reconstrutor-dos-fios' },
                      { title: 'TRATAMENTO DE MEL', link: '/tratamento-de-mel' },
                      { title: 'MATIZADOR', link: '/matizador' },
                      { title: 'FINALIZADOR', link: '/finalizador' }
                    ]} 
                  />
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={cartDrawerOpen}
        onClose={toggleCartDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: '300px' } }}
      >
        <CartPage />
      </Drawer>

      <Box sx={{ display: 'flex', color: 'white', backgroundColor: '#B5A642', padding: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton color="inherit" size="large">
              <HomeIcon />
            </IconButton>
          </Link>
        </Box>

        <Box sx={{ display: 'flex', color: 'white', justifyContent: 'center', backgroundColor: '#B5A642', padding: 1 }}>
          {!isMobile && (
            <>
              <MenuItem 
                title="ALISAMENTO" 
                subItems={[
                  { title: 'ESCOVA EM GEL', link: '/escova-em-gel' },
                  { title: 'ESCOVA PROGRESSIVA', link: '/escova-progressiva' },
                  { title: 'ESCOVA DEFINITIVA', link: '/escova-definitiva' },
                  { title: 'ESCOVA JAPONESA', link: '/escova-japonesa' }
                ]} 
              />
              <MenuItem 
                title="LINHAS ESPECIAIS" 
                subItems={[
                  { title: 'FORCE REPAIR', link: '/force-repair' },
                  { title: 'OLIVER OIL', link: '/oliver-oil' },
                  { title: 'SOS CAPILAR', link: '/sos-capilar' },
                  { title: 'DESMAIA CABELO', link: '/desmaia-cabelo' }
                ]} 
              />
              <MenuItem 
                title="CUIDADOS PESSOAIS" 
                subItems={[
                  { title: 'CABELO E BANHO', link: '/cabelo-e-banho' }
                ]} 
              />
              <MenuItem 
                title="SKIN CARE" 
                subItems={[
                  { title: 'CUIDADOS PARA A PELE', link: '/cuidados-para-a-pele' }
                ]} 
              />
              <MenuItem 
                title="PRODUTOS PARA CABELO" 
                subItems={[
                  { title: 'RECONSTRUTOR DOS FIOS', link: '/reconstrutor-dos-fios' },
                  { title: 'TRATAMENTO DE MEL', link: '/tratamento-de-mel' },
                  { title: 'MATIZADOR', link: '/matizador' },
                  { title: 'FINALIZADOR', link: '/finalizador' }
                ]} 
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
