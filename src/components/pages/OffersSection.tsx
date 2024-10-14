import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CardComponent from '../Card/CardComponent';
import { db } from '../../firebase'; // Importando a instância do Firestore
import { doc, getDoc } from 'firebase/firestore';

const OffersSection: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const docRef = doc(db, 'categories', 'jvOmC3oYk0Tu71SYmUxD'); // Referência do documento
        const docSnap = await getDoc(docRef); // Obtendo o documento

        if (docSnap.exists()) {
          const data = docSnap.data(); // Obtendo os dados
          console.log("Dados do documento:", data); // Adicionando log
          if (data && data.items) {
            setProducts(data.items); // Definindo os produtos
          } else {
            console.error("Não há produtos no documento!");
          }
        } else {
          console.error("Documento não encontrado!");
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false); // Atualizando o estado de loading
      }
    };

    fetchProducts(); // Chamando a função para buscar os produtos
  }, []);

  if (loading) {
    return <Typography>Carregando ofertas...</Typography>; // Mensagem de carregamento
  }

  return (
    <Box sx={{ padding: 5, marginTop: '3rem' }}> {/* Adicionando marginTop para espaçamento acima */}
      <Typography variant="h4" gutterBottom align="center">
        Aproveite as Melhores Ofertas
      </Typography>
      <Grid container spacing={2} justifyContent="center"> {/* Usando Grid para disposição dos cards */}
        {products.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}> {/* Definindo tamanhos responsivos */}
            <CardComponent
              id={product.id}
              title={product.title}
              subtitle={product.descricao} // Usando a descrição como subtítulo
              imgSrc={product.imageUrl}
              price={`R$ ${product.price.toFixed(2).replace('.', ',')}`} // Formatando o preço
              sx={{ height: '600px' }} // Definindo altura dos cards, largura será responsiva
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OffersSection;
