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
import { Box, Container } from '@mui/material';
import Catalog from '../ProductCatalog/Catalog';

const HomePage: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <div style={{ width: '100vw', marginBottom: '2rem', overflow: 'hidden' }}> {/* Ajustado para 100vw */}
        <Slider {...settings}>
          <div>
            <img
              src={img1}
              alt="Imagem 1"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
              }}
            />
          </div>
          <div>
            <img
              src={img2}
              alt="Imagem 2"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
              }}
            />
          </div>
        </Slider>
      </div>

      <div className="line-content">
        <div className="container">
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            {/* Primeir ao Quarto Bloco */}
            {[ 
              { img: caixaImg, title: 'Os melhores produtos', subtitle: 'Você encontra aqui!' },
              { img: cartaoImg, title: 'Parcele com cartão', subtitle: 'Pague em até 10x' },
              { img: caminhaoImg, title: 'Entrega rápida', subtitle: 'em todo o Brasil' },
              { img: qualidadeImg, title: 'Satisfação garantida', subtitle: 'ou seu dinheiro de volta' },
            ].map((item, index) => (
              <div key={index} className="box-content flex" style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                <div className="box-img" style={{ padding: '0.5rem', borderRadius: '8px' }}>
                  <img src={item.img} alt={item.title} style={{ width: '48px', height: '48px', margin: '1rem' }} />
                </div>
                <div className="box-text">
                  <div className="first text-uppercase text-lg font-bold">{item.title}</div>
                  <div className="second text-gray-600">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </Box>
        </div>
      </div>

      <Container>
        <Catalog />
      </Container>
    </div>
  );
};

export default HomePage;
