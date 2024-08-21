import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuItem from './MenuItem';
import SearchBar from './SearchBar';
import logo from '../img/logok.png'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import MenuIcon from '@mui/icons-material/Menu';


const NavBar: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#d87dab' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
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

        {!isMobile && <SearchBar />} {/* Barra de pesquisa para telas maiores */}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!isMobile ? (
            <>
              <MenuItem title="ALISAMENTO" subItems={['ESCOVA EM GEL', 'ESCOVA PROGRESSIVA','ESCOVA DEFINITIVA', 'Escova Japonesa']} />
              <MenuItem title="LINHAS ESPECIAIS" subItems={['FORCE REPAIR', 'OLIVER OIL', 'SOS CAPILAR', 'DESMAIA CABELO']} />
              <MenuItem title="CUIDADOS PESSOAIS" subItems={['CABELO E BANHO']} />
              <MenuItem title="SKIN CARE" subItems={['CUIDADOS PARA A PELE']} />
              <MenuItem title="PRODUTOS PARA CABELO" subItems={['RECONSTRUTOR DOS FIOS', 'TRATAMENTO DE MEL', 'MATIZADOR', 'FINALIZADOR']} />
              <IconButton color="inherit">
                <ShoppingCartIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ '& .MuiDrawer-paper': { width: '50%' } }} // Ajuste de largura para 50%
              >
                <List sx={{ fontSize: '2rem' }}> {/* Ajuste de tamanho de fonte para o Drawer */}
                  <ListItem button>
                    <SearchBar /> {/* Barra de pesquisa dentro do Drawer */}
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="ALISAMENTO" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="LINHAS ESPECIAIS" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="CUIDADOS PESSOAIS" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="SKIN CARE" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="PRODUTOS PARA CABELO" />
                  </ListItem>
                  <ListItem button>
                    <ShoppingCartIcon />
                  </ListItem>
                </List>
              </Drawer>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
