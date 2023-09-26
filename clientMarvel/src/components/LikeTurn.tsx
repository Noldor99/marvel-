import { FC } from 'react'
import { GrFavorite } from "react-icons/gr";
import { useTypedSelector } from '../hook/useTypedSelector';
import { useTypedDispatch } from '../hook/useTypedDispatch';
import { IHero } from '../model/heroModel';
import IconButton from './UI/iconButton/IconButton';
import { useGetHeroQuery } from '../store/api/heroApi';

interface LikeTurnProps {
  id: number;
}

const LikeTurn: FC<LikeTurnProps> = ({ id }: LikeTurnProps) => {

  const { data: hero } = useGetHeroQuery(id);

  const { TURN_LIKE } = useTypedDispatch()


  const { likeItems } = useTypedSelector((state) => state.like);

  const like = likeItems.find((like: IHero) => like.id === id);



  const addToLike = (like: IHero) => {

    TURN_LIKE(like)

  };

  return (
    <>
      {like ? (
        <IconButton orange onClick={() => addToLike(like)}>
          <GrFavorite />
        </IconButton>
      ) : (
        <>
          {hero && <>
            <IconButton noneBack onClick={() => addToLike(hero)}>
              <GrFavorite />
            </IconButton>
          </>
          }
        </>
      )}
    </>
  )
}

export default LikeTurn