// services/productService.ts
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export interface Product {
  id: string;
  title: string; // O campo 'title' contém o nome do produto
}

export const searchProducts = async (queryText: string): Promise<Product[]> => {
  const categoriesRef = collection(db, 'categories');

  // Cria a consulta para buscar produtos cujo título começa com 'queryText'
  const q = query(
    categoriesRef,
    where('title', '>=', queryText), // Busca títulos que começam com 'queryText'
    where('title', '<=', queryText + '\uf8ff'), // Isso garante que todos os produtos que começam com 'queryText' sejam retornados
    orderBy('title') // Ordena os resultados por título
  );

  const querySnapshot = await getDocs(q);
  const products: Product[] = [];

  // Itera sobre os resultados e adiciona cada produto à lista
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, title: doc.data().title });
  });

  return products; // Retorna a lista de produtos encontrados
};
