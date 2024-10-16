import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para redirecionamento
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

const NoResults = styled('div')(({ theme }) => ({
  marginLeft: '8px',
  color: '#f00',
}));

const LoadingIndicator = styled('div')(({ theme }) => ({
  marginLeft: '8px',
  color: '#aaa',
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
  const navigate = useNavigate(); // Inicializa o useNavigate

  const fetchResults = async () => {
    setLoading(true);
    setNoResults(false);

    try {
      console.log('Buscando por:', query);
      const results = await searchProducts(query);
      console.log('Resultados encontrados:', results);

      // Evita duplicatas usando um objeto para rastrear títulos únicos
      const uniqueResultsMap = results.reduce((acc, product) => {
        acc[product.title] = product; // Chave é o título do produto
        return acc;
      }, {} as Record<string, Product>);

      const uniqueResults = Object.values(uniqueResultsMap); // Converte de volta para array

      if (uniqueResults.length === 0) {
        setNoResults(true);
      } else {
        setSuggestions(uniqueResults);
      }
      onSearchResults(uniqueResults);
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

    const debounceFetchResults = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceFetchResults);
  }, [query, onSearchResults]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (query.length > 0) {
      // Redireciona para a página de resultados de pesquisa
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev === null ? 0 : Math.min(suggestions.length - 1, (prev + 1) % suggestions.length)));
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev === null ? suggestions.length - 1 : Math.max(0, (prev - 1) % suggestions.length)));
      event.preventDefault();
    } else if (event.key === 'Enter') {
      if (selectedIndex !== null && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      }
      event.preventDefault();
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setQuery(product.title);
    setSuggestions([]);
    // Redireciona para a página de detalhes do produto
    navigate(`/product/${product.id}`);
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
    </SearchContainer>
  );
};

export default SearchBar;
