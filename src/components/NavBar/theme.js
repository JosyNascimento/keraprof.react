import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Button, Container, Typography } from '@mui/material';

// Criação dos temas claro e escuro
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  // Estado para alternar entre temas
  const [mode, setMode] = useState('dark');

  // Função para alternar entre temas
  const handleThemeChange = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" gutterBottom>
          {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleThemeChange}>
          Toggle Theme
        </Button>
      </Container>
    </ThemeProvider>
  );
}
