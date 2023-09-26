import { useDebouncedCallback } from 'use-debounce';
import { useTypedDispatch } from '../../hook/useTypedDispatch';
import { useTypedSelector } from '../../hook/useTypedSelector';
import CustomRange from '../UI/customRange/CustomRange'

const WrapRange = () => {

  const { maxPrice, currentRange } = useTypedSelector((state) => state.hero)
  const { setCurrentRange } = useTypedDispatch();


  const debounced = useDebouncedCallback(
    (currentRange) => {
      setCurrentRange(currentRange);
    },
    250
  );

  return (
    <>
      <CustomRange
        max={maxPrice}
        currentValue={currentRange}
        onChange={(e) => debounced(e)} />
    </>
  )
}

export default WrapRange