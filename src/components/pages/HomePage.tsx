import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../img/banner_promocional.jpg';
import img2 from '../img/banner.jpg';
import qualidadeImg from '../img/qualidade.png';
import caixaImg from '../img/caixa.png';
import cartaoImg from '../img/cartão.png';
import caminhaoImg from '../img/caminhão.png';
import { Flex } from '@chakra-ui/react';

const HomePage: React.FC = () => {
  // Configurações do slider
  const settings = {
    dots: true, // Exibe os pontos de navegação
    infinite: true, // Habilita rotação infinita dos slides
    speed: 500, // Velocidade de transição dos slides
    slidesToShow: 1, // Quantidade de slides visíveis por vez
    slidesToScroll: 1, // Quantidade de slides que se movem por vez
    autoplay: true, // Habilita a reprodução automática dos slides
    autoplaySpeed: 3000, // Intervalo de tempo entre os slides em milissegundos
  };

  return (
    <div>
      {/* Slider de Imagens */}
      <Slider {...settings}>
        <div>
          <img src={img1} alt="Imagem 1" style={{ width: '100%', height: '60%' }} />
        </div>
        <div>
          <img src={img2} alt="Imagem 2" style={{ width: '100%', height: '60%' }} />
        </div>
      </Slider>

      {/* Adicionando novos elementos abaixo do slider */}
      <div className="line-content px-2 sm:px-4 lg:px-6 mt-6">
        <div className="container mx-auto">
          <Flex gap="8" align="center"> {/* Disposição vertical com espaçamento */}
            {/* Bloco de Conteúdo */}
            {[{
              img: caixaImg,
              title: 'Os melhores produtos',
              subtitle: 'Você encontra aqui!',
            }, {
              img: cartaoImg,
              title: 'Parcelamento no Cartão',
              subtitle: 'Pague em até 10x',
            }, {
              img: caminhaoImg,
              title: 'Entrega rápida',
              subtitle: 'Em todo o Brasil',
            }, {
              img: qualidadeImg,
              title: 'Satisfação garantida',
              subtitle: 'Ou seu dinheiro de volta',
            }
          ].map((item, index) => (
              <div key={index} className="flex items-center" style={{ width: '100%', maxWidth: '1200px' }}>
                <div className="box-img">
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '48px', height: '48px',paddingLeft: '3rem', marginBottom: '0rem' }}
                  />
                </div>
                <div className="box-text" style={{ paddingLeft: '1rem'}}>
                  <div className="first text-uppercase text-lg font-bold">
                    {item.title}
                  </div>
                  <div className="second text-gray-600">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
