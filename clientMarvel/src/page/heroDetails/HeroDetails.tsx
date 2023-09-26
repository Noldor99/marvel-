import { useNavigate, useParams } from 'react-router-dom';
import SimpleSlider from '../../components/simpleSlider/SimpleSlider';
import CustomButton from '../../components/UI/customButton/CustomButton';
import { useGetHeroQuery } from '../../store/api/heroApi';
import css from './HeroDetails.module.sass';
import LikeTurn from '../../components/LikeTurn';

const ProductDetails = () => {
  const { id } = useParams() as { id: string };

  const idNum = parseInt(id, 10)

  const { data: hero, isLoading, isError } = useGetHeroQuery(idNum);

  const navigate = useNavigate()



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading hero data.</div>;
  }

  if (!hero) {
    return <div>Hero not found.</div>;
  }

  return (
    <div className={css.home__wrap}>
      <div className={css.home__container}>
        <div className={css.body}>
          <div className={css.slider}>
            <SimpleSlider images={hero.images} />
          </div>
          <div>
            <p>{hero.nickname}</p>
            <p>{hero.real_name}</p>
            <p>{hero.catch_phrase}</p>
            <p>{hero.origin_description}</p>
            <p>Price: {hero.price}$</p>
            <p>Brand: {hero.brand.name}</p>
          </div>
        </div>
        <div className={css.power}>
          <div className='paper__sharp'>
            <div className={css.power__container}>
              <h2 className={css.power__title}>Powers:</h2>
            </div>

            {hero.powers.map((item) => (
              <p>{item.power}</p>
            ))}
          </div>
        </div>
        <div className={css.home__btn}>
          <CustomButton onClick={() => navigate(-1)}>bask</CustomButton>
          <LikeTurn id={idNum} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
