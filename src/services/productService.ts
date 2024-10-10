// src/services/productService.ts

export interface Product {
  id: number;
  title: string;
  imageUrl: string;
  price: string;
  description: string; // Descrição principal do produto
  images: string[];    // Array de imagens adicionais
  usageInstructions?: string; // Modo de uso do produto
  productsToReceive?: number; 
}

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve([
          { 
            id: 1, 
            title: 'Kit Escova Semi Definitiva Zero 2x1Litro Forever Liss', 
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/forever%20liss%2Fforeverliss.webp?alt=media&token=3c36e1e4-c66b-45e4-9acb-ad7f0cb06e21',
            price: 'R$ 249,99',
          
            description: `A Escova Semi Definitiva Forever Liss é adorada e desejada entre os profissionais da beleza: Sua tecnologia única no mercado, desenvolvida pela Forever Liss Professional® - a "Hair System Premium 3D" - é considerada uma das melhores do mundo e proporciona reestruturação capilar com total segurança, sem danificar e agredir os fios, nem exalar cheiros fortes, como nas progressivas. O Shampoo Antirresíduo da Escova Definitiva limpa profundamente os cabelos, removendo as impurezas de produtos acumulados na fibra capilar, deixando os fios extremamente higienizados, com abertura das cutículas, prontos para receberem o tratamento. O Ativador Capilar Semi Definitivo foi desenvolvido para proporcionar nutrição e redução do frizz. Promove disciplina e reestrutura internamente os fios, dando brilho e movimento aos cabelos. Sua fórmula exclusiva com Queratina Hidrolisada, Óleo de Monoi e Macadâmia proporciona maciez e brilho incríveis. Age na fibra capilar, e promove nova vida aos cabelos, deixando-os alinhados e hidratados. Indicação Cabelos extremamente rebeldes, com volume, crespos e indisciplinados. Compatível com todos os tipos de cabelo. Pode ser aplicado em cabelos com luzes. Cabelos quimicamente tratados. Tecnologia 3D System:Tecnologia única no mercado, associa Queratina hidrolisada, óleo de monoi, macadâmia e um conjunto de aminoácidos, que promovem brilho e maciez incríveis. Reconstrói a fibra capilar com a ação da escovação e o calor da prancha, proporcionando uma hidratação perfeita e cabelos lisos por um longo período.`,
            images: ['https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/forever%20liss%2Fforeverlis%201.webp?alt=media&token=9aec61c0-39e9-49e6-b2eb-4639c5aecd60',
              'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/forever%20liss%2Fforeverliss2.webp?alt=media&token=c5020629-41b5-4d5d-9864-839ecdd9b793'
            ]
          },
          { 
            id: 2, 
            title: 'Zen Hair Plástica Dos Fios 4d Escova Progressiva 2x1000ml',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/zen%20hair%2Fescova%20zen.webp?alt=media&token=ca170c1d-fb02-43cc-89a4-01671f0613b8',
            price: 'R$ 129,85',
            description: 'Zen Hair Plástica Dos Fios 4d Escova Progressiva 2x1000ml Plástica dos Fios Zen: Desenvolvido Com hidratantes poderosos e eficazes fio a fio nos cabelos, tornando-os saudáveis, macios e com brilho intenso e duradouro. Reconstroi e salva os cabelos dos danos causados pelo sol, água do mar, areia, vento. A Plástica Capilar nutre o cabelo dando um banho de queratina, fechando as cutículas dos fios e revitaliza os fios dando aos cabelos brilhoso e sedosidade da raiz as pontas. Escova Progressiva Zen Hair Plática dos Fios Contém: 01- Shampoo Limpeza Intensa (passo 1) 01- Redutor De Queratina (passo 2) Conselho de Aplicação: Passo 1 ? Com o Shampoo limpeza profunda Zen 4D, lave os cabelos, caso sinta necessidade lave mais uma vez e deixe agir de 5 à 10 minutos, após esta etapa seque os cabelos por completo, desta forma atingirá um resultado melhor ao aplicar o tratamento. Passo 2 ? Após aplicar o tratamento em mechas pequenas seque os cabelos fazendo uma escova lisa, para ter um liso perfeito é necessário escovar até 10 vezes cada mecha e finalizar com a prancha mecha a mecha. Resultado: Cabelos lisos, macios hidratados, com volume reduzido e sem frizz. Fios mais saudáveis! Cuidados: Manter fora do alcance das crianças. Em caso de contato com os olhos lavar abundantemente com água. Em caso de irritação suspenda o uso e procure um médico. Manter em local fresco Contém: 01- Shampoo Limpeza Intensa (passo 1) 01- Redutor De Queratina (passo 2)',
            images: [
              "https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/zen%20hair%2Fzem%20hair1.webp?alt=media&token=6b6380e4-dc6e-4dfe-b67f-c3fd2be549fb1",
              'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/zen%20hair%2Fzem1.webp?alt=media&token=3d7e7e4c-9049-43ba-8336-92a9dd97b164'
            ],
          },
          { 
            id: 3, 
            title: 'Kit Alisamento Térmico Job Hair', 
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/Escova%20job%20hair.webp?alt=media&token=cdb057fa-347b-4bb4-8797-f2bd6858fc24',
            price: 'R$ 129,49',
            description: 'O caminho para o cabelo perfeito requer cuidados especiais, e hoje você pode conseguir essa mudança com a ajuda da Job Hair.',
            images: []
          },
          { 
            id: 4, 
            title: 'Caneta Intradermo Pressurizada Thesera', 
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/cuidados%20pessoais%2Fcaneta.webp?alt=media&token=31efa0ba-672b-47b4-81ca-059cf24fafe8',
            price: 'R$ 350,55',
            description: 'A Caneta Intra Dermo Pressurizada é um produto portátil, leve (aproximadamente 400g) e de fácil manuseio. Com a caneta é possível fazer a aplicação de enzimas, toxina botulínica e muito mais sem o uso de agulhas. Conecta seringa de 0,5 ml O seu maior diferencial entre as canetas de mesoterapia/Intra dermoterapia que encontramos no mercado é que ela possui uma alavanca de pressurização acoplada ao aparelho. A quantidade de produto a ser injetada não precisa ser medida (é determinada quando o líquido é colocado na seringa). __________________________________________________________________________________________________ O produto permeia na pele por conta do jato de altíssima pressão, permitindo chegar nas camadas mais profundas, inclusive, nas camadas musculares. Através do sistema rotatório de medidas é possível, também, aplicar toda a quantidade escolhida de uma vez. Desta forma, realiza procedimentos de forma muita mais rápida e eficaz. ___________________________________________________________________________________________________ Utilizada para: Aplicação de toxina botulínica; Enzimas de emagrecimento; Rejuvenescimento; Anestesias; Hidrolipoclasia; Procedimentos capilares; Produção de colágeno. Vantagens: Simples de usar; Prática e anatômica; Não precisa de pilhas/ energia elétrica; Injeção de qualquer tipo de líquido; Ideal para quem tem fobia de agulhas; Uso estético, dermatológico e odontológico. ___________________________________________________________________________________________________ INFORMAMOS QUE A GARANTIA É SOMENTE DA CANETA, A CAIXA DE PRESSÃO NÃO ENTRA NA GARANTIA DE 3 MESES.',
            images: ['https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/cuidados%20pessoais%2Fcaneta1.webp?alt=media&token=545a4cad-635a-4a00-bc1d-4f0a04b56e4b',
              'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/cuidados%20pessoais%2Fcaneta2.webp?alt=media&token=3c947a55-7753-4256-806c-9f292fddc9b9'
            ]
          },
          { 
            id: 5, 
            title: 'Kit Limpeza De Pele Profunda Profissional Lakma',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/Produtos%20para%20o%20rosto%2Fkilimpezaprof..webp?alt=media&token=4ee40bcf-2bcd-4c3c-9f4d-cb59497aa04b',
            price: 'R$ 199,99',
            description: 'O Kit Lakma Limpeza de Pele é especialmente formulado para proporcionar uma limpeza profunda e profissional, adequado para todos os tipos de pele. Este kit completo é ideal tanto para profissionais da estética quanto para uso em casa, garantindo uma pele limpa, saudável e revitalizada. Composição do Kit: 1) Sabonete Líquido Facial (250ml) - Descrição: Limpa profundamente a pele, removendo impurezas e excesso de oleosidade sem ressecar. - Modo de Uso: Aplicar massageando com as pontas dos dedos e remover com gaze embebida em água. 2) Loção Tônica Facial (200ml) - Descrição: Equilibra o pH da pele, preparando-a para os próximos passos da limpeza. - Modo de Uso: Aplicar com auxílio de algodão, sem necessidade de remoção. 3) Esfoliante Facial (250g) - Descrição: Remove células mortas e promove a renovação celular, deixando a pele mais lisa e suave. - Modo de Uso: Aplicar massageando com as pontas dos dedos, deixar agir por 2 minutos e remover com gaze embebida em água. 4) Emoliente de Cravos e Espinhas (250g) - Descrição: Facilita a extração de cravos e espinhas, amolecendo a camada superficial da pele. - Modo de Uso: Aplicar uma boa camada, usar máscara térmica ou vapor de ozônio por 25 minutos, removendo com gaze embebida em água conforme necessário. 5) Máscara Calmante Facial (250g) - Descrição: Acalma e hidrata a pele, reduzindo a vermelhidão e a irritação após a extração. - Modo de Uso: Aplicar, deixar agir por 5 minutos e remover com gaze embebida em água. *Protocolo de Limpeza de Pele Frequência Recomendada: De 1 a 2 vezes por semana. 1) Higienização: Aplicar Sabonete Líquido Facial massageando e remover com gaze embebida em água. Aplicar Esfoliante Facial, deixar agir por 2 minutos e remover com gaze embebida em água. Aplicar Loção Tônica Facial com algodão (não remover). 2) Preparação: Aplicar Emoliente, usar máscara térmica ou vapor de ozônio por 25 minutos e remover com gaze conforme necessário. 3) Extração: Realizar a extração de cravos e espinhas com gaze 4) Pós Extração: Aplicar Máscara Calmante, deixar agir por 5 minutos e remover com gaze embebida em água. Aplicar se necessário Serum Suavizante/Cicatrizante nos locais mais afetados pela acne, deixar agir por 5 minutos e remover com gaze embebida em água. Benefícios do Kit Lakma Limpeza de Pele - Completo e Profissional: Proporciona uma limpeza de pele profunda e eficaz, sendo ideal para uso profissional. - Versatilidade: Adequado para todos os tipos de pele, oferecendo cuidados personalizados. - Praticidade: Inclui todos os produtos necessários para uma rotina completa de limpeza de pele.',
            images: [ 'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/Produtos%20para%20o%20rosto%2Flimpeza.webp?alt=media&token=48cec8da-665a-43ff-859f-fac76d138e33', 
              'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/Produtos%20para%20o%20rosto%2Flimpeza.webp?alt=media&token=48cec8da-665a-43ff-859f-fac76d138e33',
              'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/Produtos%20para%20o%20rosto%2Flimpeza1.webp?alt=media&token=69b7f34d-b0ba-4138-9fcb-e36b4d64d4e2',
              'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/Produtos%20para%20o%20rosto%2Flimpeza3.webp?alt=media&token=180b3708-1c61-483e-bc49-d3fd551f94c3',
              'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/Produtos%20para%20o%20rosto%2Flimpeza4.webp?alt=media&token=b92da452-f82e-4f45-b648-1d907a3929c4',
              'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/Produtos%20para%20o%20rosto%2Flimpeza5.webp?alt=media&token=27d4b055-4276-43ce-9463-123b2c0fa5ff',
            ]
          },
          { 
            id: 6, 
            title: 'Kit Antiqueda Jaborandi Sh Cd 1l Másc 1kg Bio Extratus', 
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/keraprofreact.appspot.com/o/kit%20bio%20stratus.webp?alt=media&token=2de0d42b-0488-45fe-a826-5f8a6628b97c',
            price: 'R$ 189,99',
            description: 'Kit com shampoo, condicionador e máscara tamanho profissional para cabelos com queda e pouco crescimento. Bio Extratus Jaborandi Antiqueda Trio Salão revitaliza e fortalece. O Kit Bio Extratus Jaborandi Antiqueda Trio Salão oferece uma combinação equilibrada de extratos e vitaminas, formulada para nutrir o bulbo capilar e tonificar o couro cabeludo. Essa ação conjunta fortalece e revitaliza os fios, promovendo o crescimento capilar saudável e auxiliando na prevenção da queda.',
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
