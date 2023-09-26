import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../hook/useTypedDispatch';
import { useTypedSelector } from '../../hook/useTypedSelector';
import { Badge } from '../UI/badge/Badge';
import IconButton from '../UI/iconButton/IconButton';

const WrapBadge = () => {

  const navigate = useNavigate();

  const { cartTotalQuantity } = useTypedSelector(state => state.cart);
  const { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY } = useTypedDispatch()

  useEffect(() => {
    CALCULATE_SUBTOTAL()
    CALCULATE_TOTAL_QUANTITY()
  }, []);



  return (
    <>
      <IconButton orange fullWIdth onClick={() => navigate('cart')}>
        <Badge count={cartTotalQuantity} />
      </IconButton>
    </>
  )
}

export default WrapBadge