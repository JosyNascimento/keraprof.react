import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import { searchProducts, Product } from '../../services/productService';

// Estilização dos componentes
const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const SearchWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#fff',
  width: '100%',
  maxWidth: '400px',
  boxSizing: 'border-box',
  transition: 'box-shadow 0.3s ease',
}));

const Input = styled('input')(({ theme }) => ({
  border: 'none',
  outline: 'none',
  flex: 1,
  padding: '8px 40px 8px 8px',
  fontSize: '16px',
  backgroundColor: 'inherit',
  boxSizing: 'border-box',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#aaa',
  fontSize: '20px',
  cursor: 'pointer',
}));

const LoginWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '16px',
  color: '#fff',
  fontSize: '16px',
  position: 'relative',
}));

const PersonIconWrapper = styled(PersonIcon)(({ theme }) => ({
  color: '#fff',
}));

const SuggestionsList = styled('ul')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  zIndex: 10,
  maxHeight: '200px',
  overflowY: 'auto',
}));

const SuggestionItem = styled('li')<{ selected?: boolean }>(({ selected }) => ({
  padding: '8px',
  cursor: 'pointer',
  backgroundColor: selected ? '#f0f0f0' : 'inherit',
  color: 'black',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

const LoadingIndicator = styled('div')(({ theme }) => ({
  marginLeft: '8px',
}));

const NoResults = styled('div')(({ theme }) => ({
  marginLeft: '8px',
  color: '#f00',
}));

const LoginPopup = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  zIndex: 100,
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const AccountMessage = styled('div')(({ theme }) => ({
  marginBottom: '8px',
  fontSize: '14px',
  color: '#333',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%', // Faz os botões ocuparem o espaço total
}));

const Button = styled('a')<{ outlined?: boolean }>(({ theme, outlined }) => ({
  flex: 1, // Faz os botões terem o mesmo tamanho
  marginTop: '8px',
  padding: '10px 16px',
  backgroundColor: outlined ? 'transparent' : 'deeppink',
  color: outlined ? 'deeppink' : '#fff',
  textDecoration: 'none',
  borderRadius: '4px',
  border: outlined ? '2px solid deeppink' : 'none',
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: outlined ? 'deeppink' : '#d85e95',
    color: outlined ? '#fff' : '#fff',
  },
  marginLeft: outlined ? '8px' : '0', // Espaçamento entre os botões
}));

interface SearchBarProps {
  isMobile?: boolean;
  onSearchResults: (results: Product[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile, onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    setNoResults(false);

    try {
      const results = await searchProducts(query);
      if (results.length === 0) {
        setNoResults(true);
      } else {
        setSuggestions(results);
      }
      onSearchResults(results);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      setNoResults(false);
      onSearchResults([]);
      return;
    }

    fetchResults();
  }, [query, onSearchResults]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (query.length > 0) {
      fetchResults();
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setQuery(product.title);
    setSuggestions([]);
    fetchResults();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev === null ? 0 : Math.min(suggestions.length - 1, (prev + 1) % suggestions.length)));
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev === null ? suggestions.length - 1 : Math.max(0, (prev - 1) % suggestions.length)));
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (selectedIndex !== null) {
        handleSuggestionClick(suggestions[selectedIndex]);
      }
      event.preventDefault();
    }
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <Input
          type="text"
          placeholder="Buscar produtos..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <SearchIconWrapper onClick={handleSearchClick}>
          <SearchIcon />
        </SearchIconWrapper>
        {loading && <LoadingIndicator>Loading...</LoadingIndicator>}
        {noResults && <NoResults>Nenhum resultado encontrado</NoResults>}
        {suggestions.length > 0 && (
          <SuggestionsList>
            {suggestions.map((product, index) => (
              <SuggestionItem
                key={product.id} 
                selected={index === selectedIndex}
                onClick={() => handleSuggestionClick(product)}
              >
                {product.title} 
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </SearchWrapper>
      <LoginWrapper
        onMouseEnter={() => setShowLoginPopup(true)}
        onMouseLeave={() => setShowLoginPopup(false)}
      >
        <PersonIconWrapper />
        <a href="/login" style={{ marginLeft: '8px', color: '#fff', textDecoration: 'none' }}>
          Olá, faça seu login ou cadastre-se
        </a>
        {showLoginPopup && (
          <LoginPopup>
            <AccountMessage>
              Para ver seus pedidos e ter uma experiência personalizada, acesse sua conta :)
            </AccountMessage>
            <ButtonContainer>
              <Button href="/login">Login</Button>
              <Button href="/register" outlined>
                Cadastrar
              </Button>
            </ButtonContainer>
          </LoginPopup>
        )}
      </LoginWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
