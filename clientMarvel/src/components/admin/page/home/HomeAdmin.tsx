import { useTypedSelector } from "../../../../hook/useTypedSelector"
import WrapPagination from "../../../../page/home/WrapPagination"
import CustomButton from "../../../UI/customButton/CustomButton"
import css from './HomeAdmin.module.sass'
import { useNavigate } from "react-router-dom";
import WrapPower from "./WrapPower";
import WrapDeleteHero from "./WrapDeleteHero";
import WrapAddBrand from "./WrapAddBrand";

const HomeAdmin = () => {

  const { heroes } = useTypedSelector((state) => state.hero)



  const navigate = useNavigate()

  return (
    <div className={css.container}>
      <CustomButton
        onClick={() => navigate('create/ADD')}
        orange
      >
        Create
      </CustomButton>
      <p className={css.title}>Hero:</p>
      {heroes.map((hero) => (
        <div className={css.content} key={hero.id}>
          <p>{hero.nickname}</p>
          <div className={css.btn__container}>
            <WrapPower hero={hero} />
            <WrapAddBrand id={hero.id} />
            <CustomButton outlined
              onClick={() => navigate(`addImage/${hero.id}`)}
            >
              AddImg
            </CustomButton>
            <CustomButton outlined
              onClick={() => navigate(`create/${hero.id}`)}
            >
              EditHero
            </CustomButton>
            <WrapDeleteHero hero={hero} />
          </div>
        </div>
      ))}
      <WrapPagination small />
    </div>
  )
}

export default HomeAdmin