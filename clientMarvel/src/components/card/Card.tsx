import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_SERVER } from '../../constants/url';
import { IHero } from '../../model';
import { useDeleteHeroMutation } from '../../store/api/heroApi';
import CustomButton from '../UI/customButton/CustomButton';
import IconButton from '../UI/iconButton/IconButton';
import css from './Card.module.sass'

interface CardProps {
  hero: IHero
}

const Card: FC<CardProps> = ({ hero }: CardProps) => {

  const { id, catch_phrase, nickname, title_img, origin_description } = hero

  const [deleteHero] = useDeleteHeroMutation();

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
      </div>
      <div className={css.cart__btn}>
        <CustomButton onClick={() => navigate(`hero/${id}`)}>Info</CustomButton>
        <div className={css.btn__body}>
          <IconButton
            onClick={() => {
              deleteHero(hero.id)
              navigate(-1)
            }}
          >
            <FaTrash />
          </IconButton>
          <CustomButton
            fullWIdth
            onClick={() => navigate(`create/${id}`)}>Edit</CustomButton>
        </div>
      </div>
    </div>
  )
}

export default Card