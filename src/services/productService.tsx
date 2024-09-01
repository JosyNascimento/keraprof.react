// src/services/productService.ts

export const fetchProducts = async (): Promise<any[]> => {
    // Simulação de uma chamada a uma API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Kit Escova Semi Definitiva Zero 2x1Litro Forever Liss', description: 'Alinha a estrutura dos fios e controla o volume dos cabelos, deixando-os extremamente disciplinados, leves e livres do frizz, com toque sedoso. ', imageUrl: 'https://i.postimg.cc/mDF6zyf1/ESCOVA-FOREVERLIZZ.webp' },
          { id: 2, title: 'Plástica Dos Fios 4d Zen Hair ', description: 'O caminho para o cabelo perfeito requer cuidados especiais, e hoje você pode conseguir essa mudança. Com a ajuda da Zen Hair você terá cabelos tratados desde a raiz as pontas, sem frizz, lisos e lindos port muito mais tempo', imageUrl: 'https://imgs.search.brave.com/tv9SLAa9fWLtX6LNQq-_jwsp2IARb6PrPODFMI_lbnY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/NTk0MjQtTUxCNDk5/ODk3Njg4NjlfMDUy/MDIyLVcud2VicA' },
          { id: 3, title: 'Kit Alisamento Térmico Job Hair', description: ' É COMPOSTO POR EXTRATO DE CACAU E QUERATINA, QUE PENETRAM NO CABELO DE MANEIRA EFICAZ E DURADOURA, ALÉM DE ÓLEOS DE OJON E MIRRA, QUE PROMOVEM HIDRATAÇÃO,', imageUrl: 'https://i.postimg.cc/k56WCnbq/Escova-job-hair.webp' },
          { id: 4, title: 'kit Progressiva Blindagem Dos Fios Selagem + B. Selagem', description: 'O BOTOX Frizz Control elimina o frizz e fortalece os fios, repondo todos os nutrientes que o cabelo necessita e mantendo o efeito sem volume.', imageUrl: 'https://i.postimg.cc/pLRt3ZpB/KIT-PLASTICA-DOS-FIOS.webp' },
          { id: 5, title: 'Felps Quiabo XBTX Okra máscara para o cabelo 300 ml', description: 'Para ter um cabelo perfeito requer cuidados especiais, e hoje você pode conseguir essa mudança com a ajuda da Felps Professional seus cabelos brilhosos e macios.', imageUrl: 'https://i.postimg.cc/DzhWDpN6/Felps-profissional.webp' },
          { id: 6, title: 'Kit Antiqueda Jaborandi Sh Cd 1l Másc 1kg Bio Extratus', description: 'Atua no bulbo capilar, estimulando o crescimento,  auxilia no tratamento antiqueda.Tonifica e nutre. Tendo fios fortes e saudáveis.', imageUrl: 'https://i.postimg.cc/PrQTKc24/kit-bio-stratus.webp' },
        ]);
      }, 1000); // Simula um atraso de 1 segundo
    });
  };
  