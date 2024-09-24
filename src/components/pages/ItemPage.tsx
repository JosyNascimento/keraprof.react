import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from '@mui/material';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Defina a interface para um produto
interface Product {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

const ItemPage: React.FC = () => { // Renomeado para ItemPage
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        console.log(`Buscando produto com ID: ${id}`);
        const productDoc = doc(db, "products", id);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() } as Product);
        } else {
          console.log("Produto não encontrado");
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Typography>Produto não encontrado ou carregando...</Typography>;

  return (
    <Box>
      <Typography variant="h4">{product.title}</Typography>
      <img src={product.imageUrl} alt={product.title} />
      <Typography>{product.description}</Typography>
    </Box>
  );
};

export default ItemPage; 
