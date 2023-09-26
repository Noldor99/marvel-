import { FC, useEffect } from 'react';
import { Pagination } from '../../components/UI/pagination';
import { useTypedDispatch } from '../../hook/useTypedDispatch';
import { useTypedSelector } from '../../hook/useTypedSelector';
import { useLazyGetHeroesWithPaginationQuery } from '../../store/api/heroApi';

interface WrapPaginationProps {
  small?: boolean
}

const WrapPagination: FC<WrapPaginationProps> = ({ small }: WrapPaginationProps) => {

  const { totalPage } = useTypedSelector(state => state.hero);

  const { currentPage } = useTypedSelector(state => state.filter);

  const { setCurrentPageAction } = useTypedDispatch()

  const { currentRange, currentBrand } = useTypedSelector((state) => state.hero)


  const [fetchReposAll] = useLazyGetHeroesWithPaginationQuery()

  useEffect(() => {

    fetchReposAll({
      page: currentPage,
      limit: 4,
      brandName: currentBrand,
      maxPrice: currentRange
    });

  }, [currentPage, fetchReposAll, currentBrand, currentRange]);

  useEffect(() => {

    setCurrentPageAction(1)
  }, [fetchReposAll, currentBrand, currentRange]);

  return (
    < >
      <Pagination
        small={small}
        totalPage={totalPage}
        currentPage={currentPage}
        onChangePage={(value: number) => (setCurrentPageAction(value))}
      />
    </>
  )
}

export default WrapPagination