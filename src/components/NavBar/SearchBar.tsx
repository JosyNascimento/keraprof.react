import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  isMobile?: boolean; // Adiciona a prop opcional isMobile
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', fontSize: isMobile ? '0.875rem' : '1rem' }}>
      <TextField
        label="Encontrar Produtos"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size={isMobile ? 'small' : 'medium'} // Ajusta o tamanho do campo para dispositivos móveis
      />
      <IconButton onClick={handleSearch} color="inherit">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
