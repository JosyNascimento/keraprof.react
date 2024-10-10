import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useCart } from '../Cart/CartContext'; 

const MyOrdersPage: React.FC = () => {
  const { cart } = useCart(); // Usar o contexto do carrinho para obter os produtos comprados

  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ color: 'deeppink' }}>
        Meu Perfil
      </Typography>
      
      <Typography variant="h6" sx={{ marginY: 2 }}>
        Informações do Cliente
      </Typography>
     
      <Typography variant="body1">Nome: Joseilda Nascimento</Typography>
      <Typography variant="body1">Email: joseildatn@gmail.com</Typography>
    

      <Typography variant="h6" sx={{ marginY: 2 }}>
        Produtos Comprados
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">Você ainda não comprou nenhum produto.</Typography>
      ) : (
        <List>
          {cart.map((item, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={item.title} // Usando 'title' que existe no CartItem
                secondary={`Preço: ${item.price} | Quantidade: ${item.quantity}`} 
              />
            </ListItem>
          ))}
        </List>
      )}

      <Button 
        variant="contained" 
        onClick={() => window.history.back()} // Voltar para a página anterior
        sx={{ marginTop: 2, backgroundColor: 'deeppink', color: 'white', '&:hover': { backgroundColor: 'darkmagenta' } }}
      >
        Voltar
      </Button>
    </Box>
  );
};

export default MyOrdersPage;
