import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

interface SearchBarProps {
  isMobile?: boolean; // prop opcional isMobile
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  // Define o tamanho da label com base em breakpoints
  '& .MuiInputLabel-root': {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '150px', // Largura para telas pequenas
    },
    [theme.breakpoints.up('md')]: {
      width: '600px', // Largura para telas maiores
    },
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
}));

const SearchBar: React.FC<SearchBarProps> = ({ isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <StyledTextField
        label="Encontrar Produtos"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size={isMobile ? 'small' : 'medium'}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch} color="inherit">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
