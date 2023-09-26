import InputOutlined from '../../components/UI/inputOutlined/InputOutlined';
import { useDebounce } from '../../hook/useDebounce';
import { useTypedDispatch } from '../../hook/useTypedDispatch';
import { useTypedSelector } from '../../hook/useTypedSelector';
import { useGetSearchHeroQuery } from '../../store/api/heroApi';

const WrapSearch = () => {

  const { search } = useTypedSelector((state) => state.filter);
  const { setSearchAction } = useTypedDispatch()


  const debounced = useDebounce(search)

  useGetSearchHeroQuery(debounced, {
    skip: debounced.length < 2,
    refetchOnFocus: true
  })

  return (
    <>
      <InputOutlined
        value={search} label="search"
        onChange={(e) => setSearchAction(e.target.value)}
      />
    </>
  )
}

export default WrapSearch