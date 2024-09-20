// src/components/pages/ItensList.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'; // Ajuste o caminho conforme necessário
import { doc, getDoc } from 'firebase/firestore';

interface Product {
  id: string;
  title: string;
  // Adicione outros campos que você espera que o produto tenha
}

const ItensList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.log('ID do produto não está disponível');
        return;
      }

      const productDoc = doc(db, 'products', id);
      const productData = await getDoc(productDoc);

      if (productData.exists()) {
        setProduct({ id: productData.id, ...productData.data() } as Product);
      } else {
        console.log('Produto não encontrado');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      {/* Renderize mais informações do produto aqui */}
    </div>
  );
};

export default ItensList;
