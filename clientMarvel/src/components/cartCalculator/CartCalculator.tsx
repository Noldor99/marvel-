import { FC } from 'react'
import { useTypedDispatch } from '../../hook/useTypedDispatch';
import { useTypedSelector } from '../../hook/useTypedSelector';
import { ICard } from '../../model/cartModel';
import { IHero } from '../../model/heroModel';
import CustomButton from '../UI/customButton/CustomButton';
import css from './CartCalculator.module.sass'

interface CartCalculatorProps {
  id: number;
  hero?: IHero
}


const CartCalculator: FC<CartCalculatorProps> = ({ id, hero }: CartCalculatorProps) => {


  const { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART } = useTypedDispatch()

  const { cartItems } = useTypedSelector((state) => state.cart);

  const cart = cartItems.find((cart: ICard) => cart.id === id);


  const isCartAdded = cartItems.findIndex((cart: ICard) => {
    return cart.id === id;
  });


  const addToCart = (cart: IHero) => {
    ADD_TO_CART(cart)
  };

  const decreaseCart = (cart: ICard) => {
    DECREASE_CART(cart)
    CALCULATE_TOTAL_QUANTITY()
  };


  return (
    <div className={css.cart__container}>
      {isCartAdded < 0 && hero ?
        <CustomButton
          outlined fullWIdth green
          onClick={() => addToCart(hero)}
        >
          ADD TO CART
        </CustomButton> : (
          <>
            {cart &&
              <>
                <CustomButton
                  outlined
                  onClick={() => decreaseCart(cart)}
                >
                  -
                </CustomButton>
                <p>
                  {cart?.cartQuantity}
                </p>
                <CustomButton
                  outlined
                  onClick={() => addToCart(cart)}
                >
                  +
                </CustomButton>
              </>
            }
          </>
        )}
    </div>
  )
}

export default CartCalculator