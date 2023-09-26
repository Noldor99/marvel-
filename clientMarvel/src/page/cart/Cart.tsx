import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartCalculator from "../../components/cartCalculator/CartCalculator";
import MenuCartMore from "../../components/menuCartMore/MenuCartMore";
import CustomButton from "../../components/UI/customButton/CustomButton";
import Divider from "../../components/UI/divider/Divider";
import { BASE_URL_SERVER } from "../../constants/url";
import { useTypedDispatch } from "../../hook/useTypedDispatch";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { ICard } from "../../model/cartModel";
import css from './Cart.module.sass'

const BASE_URL = ''

const Cart = () => {
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useTypedSelector(state => state.cart);
  const {
    CLEAR_CART,
    CALCULATE_SUBTOTAL,
    CALCULATE_TOTAL_QUANTITY,
    SAVE_URL
  } = useTypedDispatch()


  const { userInfo } = useTypedSelector(state => state.auth);

  const navigate = useNavigate();

  const clearCart = () => {
    CLEAR_CART()
  };

  useEffect(() => {
    CALCULATE_SUBTOTAL()
    CALCULATE_TOTAL_QUANTITY()
    SAVE_URL("")
  }, [cartItems]);

  const url = window.location.href;


  const checkout = () => {
    if (userInfo) {
      navigate(`${BASE_URL}/checkout-details`);
    } else {
      SAVE_URL(url);
      navigate(`/auth/login`);
    }
  };

  return (

    <div className={css.wrap}>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart is currently empty.</p>
          <Divider />
          <CustomButton onClick={() => navigate(`/`)}>
            Continue shopping
          </CustomButton>
        </>
      ) : (

        <div className={css.cart__container}>
          <div className={css.cart__body}>

            <p className={css.cart__title}>
              Shopping Cart
            </p>
            {cartItems.map((cart: ICard) => {
              const { id, price, cartQuantity } = cart;

              return (
                <>
                  <div className={css.card__content}>
                    <div  >
                      <div>
                        <div className={css.card__imgContainer}>
                          <div className={css.card__imgBody}>
                            <img src={`${BASE_URL_SERVER}/${cart.title_img}`} alt={cart.nickname} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <div className={css.box__top}>
                            <p>{cart.nickname}</p>
                            {/* <MenuCartMore id={id} cartItems={cartItems} /> */}
                            <MenuCartMore id={id} />
                          </div>
                        </div>
                        <div className={css.calc__wrap}>
                          <div className={css.calc__body}>
                            <CartCalculator id={id} />
                          </div>
                          <div className={css.calc__wrap__title}>
                            <p>Price: {price}$</p>
                            <p>PriceQuantity: {cartQuantity && cartQuantity * Number(price.toFixed(2))}$</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          </ div>
          <div className={css.btn__container}>

            <CustomButton outlined onClick={clearCart}>
              Clear Cart
            </CustomButton>

            <CustomButton
              outlined orange
              onClick={() => navigate('/')}  >
              Continue shopping
            </CustomButton>

          </div>
          <div>
            <br />
            <div className={css.checkout__container}>
              <div>
                <div>

                </div>
                <div className={css.checkout__content}>
                  <p>
                    <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={css.checkou__text}>
                    <p >Subtotal:</p>
                    <p >{`$${cartTotalAmount.toFixed(2)}`}</p>
                  </div>
                  <p>Tax an shipping calculated at checkout</p>
                  <CustomButton green onClick={checkout}>
                    Checkout
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >

  );
};

export default Cart;
