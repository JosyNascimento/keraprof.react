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
    infinite: true,          // Loop infinito
    speed: 500,              // Velocidade de transição
    slidesToShow: 1,         // Mostrar um slide por vez
    slidesToScroll: 1,       // Rolar um slide por vez
    autoplay: true,          // Iniciar automaticamente
    autoplaySpeed: 3000,     // Velocidade de autoplay (em milissegundos)  
  };

  return (
    <div>
      {/* Slider de Imagens */}
      <div style={{ width: '100%', maxWidth: '100vw', marginBottom: '2rem' }}>
        <Slider {...settings}>
          <div>
            <img
              src={img1}
              alt="Imagem 1"
              style={{
                width: '110%',//verificar pq esta com espaço
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
                width: '110%', //verificar pq esta com espaço
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
              }}
            />
          </div>
        </Slider>
      </div>

      {/* Adicionando novos elementos */}
      <div className="line-content">
        <div className="container">
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            {/* Primeiro Bloco */}
            <a className="box-content flex" style={{ display: 'flex', alignItems: 'center', padding: '1rem 0' }}>
              <div className="box-img" style={{ padding: '0.5rem', borderRadius: '8px' }}>
                <img src={caixaImg} alt="caixa para envio" style={{ width: '48px', margin: '1rem', height: '48px' }} />
              </div>
              <div className="box-text">
                <div className="first text-uppercase text-lg font-bold">Os melhores produtos</div>
                <div className="second text-gray-600">Você encontra aqui!</div>
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
