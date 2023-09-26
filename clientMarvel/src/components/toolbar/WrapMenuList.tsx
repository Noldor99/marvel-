import { useTypedDispatch } from '../../hook/useTypedDispatch';
import { useTypedSelector } from '../../hook/useTypedSelector';
import { useGetBrandsQuery } from '../../store/api/brandApi';
import MenuList from '../UI/menuListButton/MenuList'

const WrapMenuList = () => {

  const { data: fetchBrands } = useGetBrandsQuery()

  const { currentBrand } = useTypedSelector((state) => state.hero)
  const { setCurrentBrand } = useTypedDispatch();

  const allBrands = [
    "All",
    ...new Set(fetchBrands),
  ];

  const handleMenuListButtonClick = (label: string) => {

    setCurrentBrand(label)
  };
  return (
    <>
      <MenuList
        activeLabel={currentBrand}
        dataMenuList={allBrands}
        setMenuList={handleMenuListButtonClick}
      />
    </>
  )
}

export default WrapMenuList