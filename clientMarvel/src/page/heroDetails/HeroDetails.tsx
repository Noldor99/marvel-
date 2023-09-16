import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import PowerAdd from '../../components/powerAdd/PowerAdd';
import SimpleSlider from '../../components/simpleSlider/SimpleSlider';
import CustomButton from '../../components/UI/customButton/CustomButton';
import { useModal } from '../../hook/useModal';
import { useGetHeroQuery } from '../../store/api/heroApi';
import css from './HeroDetails.module.sass';

const ProductDetails = () => {
  const { id } = useParams() as { id: string };

  const { data: hero, isLoading, isError } = useGetHeroQuery(id);

  const navigate = useNavigate()

  const { isOpen, openModal, closeModal } = useModal();

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
    <div className={`containerGlobal `}>
      <div className={`paper__rounding ${css.home__container}`}>
        <div className={css.body}>
          <div className={css.slider}>
            <SimpleSlider images={hero.images} />
          </div>
          <div>
            <p>{hero.nickname}</p>
            <p>{hero.real_name}</p>
            <p>{hero.catch_phrase}</p>
            <p>{hero.origin_description}</p>
            <CustomButton onClick={() => navigate(`/addImage/${hero.id}`)}>
              Add Image
            </CustomButton>
          </div>
        </div>
        <div className={css.power}>
          <div className='paper__sharp'>
            <div className={css.power__container}>
              <h2 className={css.power__title}>Powers:</h2>
              <CustomButton onClick={openModal}>Add Pawer</CustomButton>
              <Modal title="Модальне Вікно" open={isOpen} onClose={closeModal}>
                <PowerAdd hero={hero} />
              </Modal>
            </div>
            {hero.powers.map((item) => (
              <p>{item.power}</p>
            ))}
          </div>
        </div>
        <div className={css.home__btn}>
          <CustomButton onClick={() => navigate(-1)}>bask</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
