import css from './Badge.module.sass'
import { FaShoppingCart } from 'react-icons/fa';

export const Badge = ({ count }: any) => {
  return (
    <span className={css.body}>
      <FaShoppingCart size={32} color="white" />
      <span className={css.count}>{count}</span>
    </span>
  )
}

