import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_SERVER } from '../../constants/url';
import CustomButton from '../UI/customButton/CustomButton';
import css from './Card.module.sass'
import { IHero } from '../../model/heroModel';
import CartCalculator from '../cartCalculator/CartCalculator';
import LikeTurn from '../LikeTurn';

interface CardProps {
  hero: IHero
}

const Card: FC<CardProps> = ({ hero }: CardProps) => {

  const { id, catch_phrase, nickname, title_img, origin_description, price } = hero



  const navigate = useNavigate()

  const shortenText = (text: string, n: number) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div className={css.card}>
      <div className={css.card__imgContainer}>
        <div className={css.card__imgBody}>
          <img
            src={`${BASE_URL_SERVER}/${title_img}`} alt={nickname}
          />
        </div>
      </div>
      <div className={css.card__description}>
        <h3>{shortenText(nickname, 18)}</h3>
        <p className={css.parag}>{shortenText(origin_description, 200)}</p>
        <p>{catch_phrase}</p>
        <p>{price}$</p>
      </div>
      <div className={css.cart__btn}>
        <CartCalculator id={id} hero={hero} />
        <div className={css.info__box}>
          <div className={css.info__btn}>
            <CustomButton fullWIdth
              onClick={() => navigate(`hero/${id}`)}
            >
              Info
            </CustomButton>
          </div>
          <div className={css.like__btn}>
            <LikeTurn id={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card