import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/UI/customButton/CustomButton";
import { Pagination } from "../../components/UI/pagination";
import CardList from "../../components/сardList/CardList";
import { useTypedDispatch } from "../../hook/useTypedDispatch";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { useLazyGetHeroesWithPaginationQuery } from "../../store/api/heroApi";
import css from './Home.module.sass'


const Home = () => {

  const { totalPage, heroes } = useTypedSelector(state => state.hero);
  const { currentPage } = useTypedSelector(state => state.filter);
  const { setCurrentPageAction } = useTypedDispatch()
  const [fetchReposAll] = useLazyGetHeroesWithPaginationQuery()

  const navigate = useNavigate()

  useEffect(() => {
    fetchReposAll({ page: currentPage, limit: 4 })
  }, [currentPage, fetchReposAll]);

  console.log(heroes)

  return (
    <div className={`containerGlobal ${css.container__home}`}>
      <div className={css.topButton}>
        <CustomButton
          onClick={() => navigate('/create/ADD')}
          orange
        >
          Create
        </CustomButton>
      </div>
      <CardList />
      <div>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onChangePage={(value: number) => (setCurrentPageAction(value))}
        />
      </div>
    </div >
  )
}

export default Home
