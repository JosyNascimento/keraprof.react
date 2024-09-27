import React, { useEffect, useState } from "react";
import { Typography, Box } from '@mui/material';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams, useNavigate } from 'react-router-dom';



interface Product {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: string;
}

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("subcat1:", id); //  para debug
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
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
  

  if (!product) return <Typography>carregando produto...</Typography>;

  return (
    <Box>
      <Typography variant="h4">{product.title}</Typography>
      <img src={product.imageUrl} alt={product.title} />
      <Typography>{product.description}</Typography>
      <Typography>Preço: {product.price}</Typography>
    </Box>
  );
};

export default ItemPage;
