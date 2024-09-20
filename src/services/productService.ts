// src/services/productService.ts

export interface Product {
  id: number;
  title: string;
  imageUrl: string;
  price: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve([
          { 
            id: 1, 
            title: 'Kit Escova Semi Definitiva Zero 2x1Litro Forever Liss', 
            imageUrl: 'https://i.postimg.cc/mDF6zyf1/ESCOVA-FOREVERLIZZ.webp',
            price: 'R$ 249,99' 
          },
          { 
            id: 2, 
            title: 'Plástica Dos Fios 4d Zen Hair', 
            imageUrl: 'https://imgs.search.brave.com/tv9SLAa9fWLtX6LNQq-_jwsp2IARb6PrPODFMI_lbnY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/NTk0MjQtTUxCNDk5/ODk3Njg4NjlfMDUy/MDIyLVcud2VicA',
            price: 'R$129,99' 
          },
          { 
            id: 3, 
            title: 'Kit Alisamento Térmico Job Hair', 
            imageUrl: 'https://i.postimg.cc/k56WCnbq/Escova-job-hair.webp',
            price: 'R$169,80' 
          },
          { 
            id: 4, 
            title: 'Kit Progressiva Blindagem Dos Fios Selagem + B. Selagem', 
            imageUrl: 'https://i.postimg.cc/pLRt3ZpB/KIT-PLASTICA-DOS-FIOS.webp',
            price: 'R$99,99'  
          },
          { 
            id: 5, 
            title: 'Felps Quiabo XBTX Okra máscara para o cabelo 300 ml',
            imageUrl: 'https://i.postimg.cc/DzhWDpN6/Felps-profissional.webp',
            price: 'R$39,99' 
          },
          { 
            id: 6, 
            title: 'Kit Antiqueda Jaborandi Sh Cd 1l Másc 1kg Bio Extratus', 
            imageUrl: 'https://i.postimg.cc/PrQTKc24/kit-bio-stratus.webp',
            price: 'R$289,99'

            
          },
          
        ]);
      } catch (error) {
        reject(error);
      }
    }, 2000); // atraso de 2 segundos
  });
};

// Função para buscar detalhes de um produto específico
export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    const products = await fetchProducts();
    return products.find(product => product.id === id) || null;
  } catch (error) {
    console.error('Erro ao buscar o produto:', error);
    return null;
  }
};

// Função para buscar produtos com base na consulta de busca
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const products = await fetchProducts();
    console.log('Produtos disponíveis:', products); // Log para verificar produtos disponíveis
    return products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};
