import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IImage } from '../../model';
import { FC } from 'react';
import { BASE_URL_SERVER } from '../../constants/url';
import css from './SimpleSlider.module.sass'


interface SliderProps {
  images: IImage[]
}

const SimpleSlider: FC<SliderProps> = ({ images }: SliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((img) => (
        <div key={img.id} className={css.body}>
          <img src={`${BASE_URL_SERVER}/${img.imageHero}`} alt={img.imageHero} />
        </div>
      ))}
    </Slider>
  );
}

export default SimpleSlider;
