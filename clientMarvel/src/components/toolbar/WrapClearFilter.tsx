import { useTypedDispatch } from '../../hook/useTypedDispatch';
import CustomButton from '../UI/customButton/CustomButton';

const WrapClearFilter = () => {

  const { setCurrentBrand, clearFillter } = useTypedDispatch();

  const hundleClearFillter = () => {
    clearFillter()
    setCurrentBrand('All')
  };

  return (
    <>
      <CustomButton outlined
        onClick={hundleClearFillter}
      >
        Clear Filter
      </CustomButton>
    </>
  )
}

export default WrapClearFilter