// src/components/Footer/Footer.tsx

import React, { useState } from 'react';
import { Box, Typography, Link, Grid, Button, TextField } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';
import './Footer.css'; // Certifique-se de que o caminho está correto

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
    <footer>
      <Box sx={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Cadastre-se para ofertas exclusivas</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={handleEmailChange}
                sx={{ flexGrow: 1, marginRight: '10px' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubscribe}
              >
                OK
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6">Informações</Typography>
            <ul>
              <li><Link href="#">Nossa Empresa</Link></li>
              <li><Link href="#">Segurança</Link></li>
              <li><Link href="#">Pagamentos</Link></li>
              <li><Link href="#">Trocas e Devoluções</Link></li>
              <li><Link href="#">Fale Conosco</Link></li>
            </ul>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6">Contato</Typography>
            <Typography>Telefone: (00) 1234-5678</Typography>
            <Typography>Email: contato@exemplo.com</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WhatsApp sx={{ marginRight: '8px' }} />
              <Typography>Horário de Atendimento: 9h às 18h</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Compra Segura</Typography>
            <Link href="#">
              <img
                src="https://via.placeholder.com/150x50"
                alt="Compra Segura"
                style={{ width: '150px', height: '50px' }}
              />
            </Link>
            <Box sx={{ backgroundColor: '#FFD700', padding: 2, textAlign: 'center', width: '100%', margin: '0' }}>
      <Typography variant="body1" color="white">
        © 2024 KeraProf. Todos os direitos reservados.
      </Typography>
    </Box>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;

