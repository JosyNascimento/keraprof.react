import React, { useState } from 'react';
import { TextField, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  isMobile?: boolean; // prop opcional isMobile
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: isMobile ? '0.5rem' : '1rem' }}>
      <TextField
        label="Encontrar Produtos"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size={isMobile ? 'small' : 'medium'}
        InputLabelProps={{
          style: { color: 'white' }, // Label na cor branca
        }}
        InputProps={{
          style: { color: 'white' }, // Texto digitado na cor branca
          endAdornment: (
            <IconButton onClick={handleSearch} color="inherit">
              <SearchIcon />
            </IconButton>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // Cor da borda
            },
            '&:hover fieldset': {
              borderColor: 'white', // Cor da borda ao passar o mouse
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // Cor da borda quando focado
            },
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
