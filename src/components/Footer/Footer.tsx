import React, { useState } from 'react';
import { Box, Typography, Link, Grid, Button, TextField } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = () => {
    // Lógica para enviar o e-mail
    alert(`Email cadastrado: ${email}`);
  };

  return (
    <footer style={{ width: '100vw', margin: 0, padding: 0 }}> {/* Garantir 100% da largura da página */}
      <Box
        sx={{
          border: '2px solid pink',
          borderRadius: '4px',
          padding: '6rem',
          backgroundColor: '#ffffe0', // Amarelo bem claro
          width: '100%', // 100% da largura
          boxSizing: 'border-box',
          marginTop: '4rem', // Espaço superior
          paddingTop: '3rem', // Padding superior de 3rem
        }}
      >
        <Typography
          variant="h5"
          sx={{
            backgroundColor: '#B5A642', // Dourado
            color: '#fff', // Branco
            padding: '8px',
            textAlign: 'center',
            borderRadius: '4px',
            marginBottom: '16px', // Espaçamento inferior
          }}
        >
          Cadastre-se para ofertas exclusivas
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={handleEmailChange}
            sx={{
              flexGrow: 1,
              marginRight: '10px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                border: '2px solid pink', // Borda rosa
              },
              '& .MuiOutlinedInput-root.Mui-focused': {
                '& fieldset': {
                  borderColor: 'pink', // Borda rosa quando em foco
                },
              },
              '& .MuiOutlinedInput-input': {
                paddingRight: '0', // Remove o padding interno direito para encaixar o botão
                '&::placeholder': {
                  color: 'pink', // Cor do texto do placeholder
                  opacity: 1, // Garante que a cor seja visível
                },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#B5A642', // Cor de fundo dourada
              color: '#fff', // Cor do texto branco
              '&:hover': {
                backgroundColor: '#ff66b2', // Cor rosa mais clara ao passar o mouse
              },
              height: '100%', // Garante que o botão tenha a mesma altura do campo de texto
              marginLeft: '-2px', // Remove o espaço entre o campo de texto e o botão
              borderRadius: '0 4px 4px 0', // Mantém o botão alinhado com o campo de texto
            }}
            onClick={handleSubscribe}
          >
            OK
          </Button>
        </Box>
      </Box>

      <Box sx={{ padding: '40px 0', backgroundColor: '#f8f9fa' }}>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={3}>
            <Typography variant="h4" sx={{ color: 'DeepPink' }}>Informações</Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>Nossa Empresa</Link></li>
              <li><Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>Segurança</Link></li>
              <li><Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>Pagamentos</Link></li>
              <li><Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>Trocas e Devoluções</Link></li>
              <li><Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>Fale Conosco</Link></li>
            </ul>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h4" sx={{ color: 'DeepPink' }}>Contato</Typography>
            <Typography>Telefone: (00) 1234-5678</Typography>
            <Typography>Email: contato@keraprof.com</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <WhatsApp sx={{ marginRight: '8px' }} />
              <Typography>Horário de Atendimento: 9h às 18h</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{
        backgroundColor: '#d87dab', // Cor do fundo do rodapé
        padding: 3,
        textAlign: 'center',
        width: '100%', // Garantindo 100% da largura
        marginTop: '20px',
        boxSizing: 'border-box', // Incluindo padding e border nas dimensões
      }}>
        <Typography variant="body1" color="white">
          © 2024 KeraProf. Todos os direitos reservados.
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
