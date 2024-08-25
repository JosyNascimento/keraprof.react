import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../img/banner_promocional.jpg';
import img2 from '../img/banner.jpg';
import { Center } from '@chakra-ui/react';

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
      <Slider {...settings}>
        <div>
          <img src={img1} alt="Imagem 1" style={{ width: '100%', height: '60%'}} />
        </div>
        <div>
          <img src={img2} alt="Imagem 2" style={{ width: '100%', height: '60%' }} />
        </div>
      </Slider>

 {/* adicionando novos elementos */}
 <div className="line-content">
  <div className="container">
    <div className="flex box-line justify-between align-center">
      {/* Primeiro Bloco */}
      <a className="box-content flex">
        <div className="box-img">
          <img src="src/components/img/caixa.png" alt="caixa para envio" />
        </div>
        <div className="box-text">
          <div className="first uppercase">Os melhores produtos</div>
          <div className="second">Você encontra aqui!</div>
        </div>
      </a>

      {/* Segundo Bloco */}
      <a className="box-content flex">
        <div className="box-img">
          <img src="src/components/img/cartão.png" alt="formas de pagamento" />
        </div>
        <div className="box-text">
          <div className="first uppercase">Pague em até 10x</div>
          <div className="second">qualidade e preço</div>
        </div>
      </a>

      {/* Terceiro Bloco */}
      <a className="box-content flex">
        <div className="box-img">
          <img src="src/components/img/caminhão.png" alt="entrega" />
        </div>
        <div className="box-text">
          <div className="first uppercase">Entrega rápida</div>
          <div className="second">em todo o Brasil</div>
        </div>
      </a>

      {/* Quarto Bloco */}
      <a className="box-content flex">
        <div className="box-img">
          <img src="src/components/img/qualidade.png" alt="qualidade" />
        </div>
        <div className="box-text">
          <div className="first uppercase">Satisfação garantida</div>
          <div className="second">ou seu dinheiro de volta</div>
        </div>
      </a>
    </div>
  </div>
</div>

      {/* Aqui termina o conteúdo fornecido */}





    </div>
  );
};

export default HomePage;


export {};