// src/components/pages/HomePage.tsx
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
import CardComponent from '../CardComponent';
import { Box, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const products = [
    { id: 1, title: 'PROGRESSIVA NANOPLÁSTIA 1L SEM FORMOL', subtitle: 'NANOPLÁSTIA PANTOVIN: Tem através de seu sistema integrado de aminoácidos que atuam na papila dérmica, ou seja, na zona de proliferação do folículo piloso, propiciando a reposição integral destes agentes na cutícula e no bulbo capilar e o resultado é uma regeneração, cauterização instantâneo dos fios. Previne o envelhecimento  e promove hidratação, revitalização e selagem da fibra capilar, tornando os fios mais lisos, sedosos, resistentes, brilhantes e macios.', imgSrc: img1 },
    { id: 2, title: 'Produto 2', subtitle: 'Descrição do produto 2', imgSrc: img2 },
    { id: 3, title: 'Produto 3', subtitle: 'Descrição do produto 3', imgSrc: img1 },
    { id: 4, title: 'Produto 4', subtitle: 'Descrição do produto 4', imgSrc: img2 },
    // Adicione mais produtos conforme necessário
  ];

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

      {/* Adicionando novos elementos */}
      <div className="line-content">
        <div className="container">
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            
            {/* Primeiro Bloco */}
            <a className="box-content flex" style={{ display: 'flex', alignItems: 'center', padding: '1rem 0' }}>
              <div className="box-img" style={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '8px' }}>
                <img src={caixaImg} alt="caixa para envio" style={{ width: '48px', margin: '1rem', height: '48px', }} />
              </div>
              <div className="box-text">
                <div className="first text-uppercase text-lg font-bold">
                  Os melhores produtos
                </div>
                <div className="second text-gray-600">
                  Você encontra aqui!
                </div>
              </div>
            </a>

            {/* Segundo Bloco */}
            <a className="box-content flex" style={{ display: 'flex', alignItems: 'center', padding: '1rem ' }}>
              <div className="box-img">
                <img src={cartaoImg} alt="formas de pagamento" style={{ width: '48px', margin: '1rem', height: '48px' }} />
              </div>
              <div className="box-text">
                <div className="first uppercase">Parcele com cartão</div>
                <div className="second">Pague em até 10x</div>
              </div>
            </a>

            {/* Terceiro Bloco */}
            <a className="box-content flex" style={{ display: 'flex', alignItems: 'center', padding: '1rem ' }}>
              <div className="box-img">
                <img src={caminhaoImg} alt="entrega" style={{ width: '48px', margin: '1rem', height: '48px' }} />
              </div>
              <div className="box-text" >
                <div className="first uppercase">Entrega rápida</div>
                <div className="second">em todo o Brasil</div>
              </div>
            </a>

            {/* Quarto Bloco */}
            <a className="box-content flex" style={{ display: 'flex', alignItems: 'center', padding: '1rem 0' }}>
              <div className="box-img">
                <img src={qualidadeImg} alt="qualidade" style={{ width: '48px', margin: '1rem', height: '48px' }} />
              </div>
              <div className="box-text" style={{ margin: '1rem ' }}>
                <div className="first uppercase">Satisfação garantida</div>
                <div className="second">ou seu dinheiro de volta</div>
              </div>
            </a>
          </Box>
        </div>
      </div>

      {/* Cards */}
      <Box p={2}>
        <Typography variant="h4" gutterBottom align="center">
          Novidades selecionadas para você
        </Typography>

        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {products.map(product => (
            <CardComponent
              key={product.id}
              id={product.id} // Passe o id para o CardComponent
              title={product.title}
              subtitle={product.subtitle}
              imgSrc={product.imgSrc}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
