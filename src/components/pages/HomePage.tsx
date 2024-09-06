// src/components/pages/HomePage.tsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../assets/img/banner_promocional.jpg';
import img2 from '../../assets/img/banner.jpg';
import qualidadeImg from '../../assets/img/qualidade.png';
import caixaImg from '../../assets/img/caixa.png';
import cartaoImg from '../../assets/img/cartão.png';
import caminhaoImg from '../../assets/img/caminhão.png';
import { Box, Typography, Container, Grid } from '@mui/material';
import Catalog from '../ProductCatalog/Catalog';
import Footer from '../Footer/Footer'; // Importando o Footer

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
                <img src={caixaImg} alt="caixa para envio" style={{ width: '48px', margin: '1rem', height: '48px' }} />
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
              <div className="box-text">
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

      {/* Importando e exibindo o Catalog */}
      <Container>
        <Catalog />
      </Container>
    </div>
  );
};

export default HomePage;
