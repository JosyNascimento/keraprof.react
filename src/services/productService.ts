// src/services/productService.ts

export interface Product {
  id: number;
  title: string;
  imageUrl: string;
  price: string;
  description: string; // Descrição principal do produto
  images: string[];    // Array de imagens adicionais
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
            price: 'R$ 249,99',
            description: `Descrição do produto 1`,
            images: []
          },
          { 
            id: 2, 
            title: 'Zen Hair Plástica Dos Fios 4d Escova Progressiva 2x1000ml',
            imageUrl: 'https://imgs.search.brave.com/tv9SLAa9fWLtX6LNQq-_jwsp2IARb6PrPODFMI_lbnY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/NTk0MjQtTUxCNDk5/ODk3Njg4NjlfMDUy/MDIyLVcud2VicA',
            price: 'R$ 129,99',
            description: `
              Descrição:
              Zen Hair Plástica dos Fios Zen: Desenvolvido com hidratantes poderosos e eficazes fio a fio nos cabelos, tornando-os saudáveis, macios e com brilho intenso e duradouro. Reconstroi e salva os cabelos dos danos causados pelo sol, água do mar, areia e vento. A Plástica Capilar nutre o cabelo dando um banho de queratina, fechando as cutículas dos fios e revitaliza os fios, dando aos cabelos brilhoso e sedosidade da raiz às pontas.



              Conselho de Aplicação:
              
              - Passo 1: Com o Shampoo Limpeza Profunda Zen 4D, lave os cabelos. Caso sinta necessidade, lave mais uma vez e deixe agir de 5 a 10 minutos. Após esta etapa, seque os cabelos por completo, desta forma atingirá um resultado melhor ao aplicar o tratamento.

              - Passo 2: Após aplicar o tratamento em mechas pequenas, seque os cabelos fazendo uma escova lisa. Para ter um liso perfeito, é necessário escovar até 10 vezes cada mecha e finalizar com a prancha mecha a mecha.

              Resultado:
              
              
              - Cabelos lisos, macios, hidratados, com volume reduzido e sem frizz. Fios mais saudáveis!

              Cuidados:
              
              - Manter fora do alcance das crianças. Em caso de contato com os olhos, lavar abundantemente com água. Em caso de irritação, suspenda o uso e procure um médico. Manter em local fresco.

              
              
        
              
              Escova Progressiva Zen Hair Plástica dos Fios Contém:
              
              - 01 Shampoo Limpeza Intensa (passo 1)
              - 01 Redutor de Queratina (passo 2)

              ***Imagem Ilustrativa***
            `,
            images: [
              "https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/escova%20zen.webp?alt=media&token=4e72a1cb-c1a9-4a9b-b8ce-2171e34492a1",
            ],
          },
          { 
            id: 3, 
            title: 'Kit Alisamento Térmico Job Hair', 
            imageUrl: 'https://i.postimg.cc/k56WCnbq/Escova-job-hair.webp',
            price: 'R$ 169,80',
            description: 'Descrição do produto 3',
            images: []
          },
          { 
            id: 4, 
            title: 'Kit Progressiva Blindagem Dos Fios Selagem + B. Selagem', 
            imageUrl: 'https://i.postimg.cc/pLRt3ZpB/KIT-PLASTICA-DOS-FIOS.webp',
            price: 'R$ 99,99',
            description: 'Descrição do produto 4',
            images: []
          },
          { 
            id: 5, 
            title: 'Felps Quiabo XBTX Okra máscara para o cabelo 300 ml',
            imageUrl: 'https://i.postimg.cc/DzhWDpN6/Felps-profissional.webp',
            price: 'R$ 39,99',
            description: 'Descrição do produto 5',
            images: []
          },
          { 
            id: 6, 
            title: 'Kit Antiqueda Jaborandi Sh Cd 1l Másc 1kg Bio Extratus', 
            imageUrl: 'https://i.postimg.cc/PrQTKc24/kit-bio-stratus.webp',
            price: 'R$ 289,99',
            description: 'Descrição do produto 6',
            images: []
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
