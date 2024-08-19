import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <TextField
        label="Encontrar Produtos"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton onClick={handleSearch} color="inherit">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
