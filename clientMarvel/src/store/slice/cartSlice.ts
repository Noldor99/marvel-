import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { ICard } from "../../model/cartModel"
import { IHero } from "../../model/heroModel"

interface cartSliceProps {
  cartItems: ICard[]
  cartTotalQuantity: number
  cartTotalAmount: number
  previousURL: string
}

const cartItems = localStorage.getItem("cartItems")
const initialState: cartSliceProps = {
  cartItems: cartItems ? JSON.parse(cartItems) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action: PayloadAction<IHero>) {
      console.log(action.payload)
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1
        toast.info(`${action.payload.nickname} increased by one`, {
          position: "top-left",
        })
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempProduct)
        toast.success(`${action.payload.nickname} added to cart`, {
          position: "top-left",
        })
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    DECREASE_CART(state, action) {
      console.log(action.payload)
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1
        toast.info(`${action.payload.name} decreased by one`, {
          position: "top-left",
        })
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        )
        state.cartItems = newCartItem
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        })
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    REMOVE_FROM_CART(state, action: PayloadAction<{ id: number }>) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      )

      state.cartItems = newCartItem

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    CLEAR_CART(state) {
      state.cartItems = []
      toast.info(`Cart cleared`, {
        position: "top-left",
      })

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    CALCULATE_SUBTOTAL(state) {
      const array: number[] = []
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item
        const cartItemAmount = price * cartQuantity
        return array.push(cartItemAmount)
      })
      const totalAmount = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.cartTotalAmount = totalAmount
    },
    CALCULATE_TOTAL_QUANTITY(state) {
      const array: number[] = []
      state.cartItems.map((item) => {
        const { cartQuantity } = item
        const quantity = cartQuantity
        return array.push(quantity)
      })
      const totalQuantity = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.cartTotalQuantity = totalQuantity
    },
    SAVE_URL(state, action) {
      console.log(action.payload)
      state.previousURL = action.payload
    },
  },
})

export const cartActions = cartSlice.actions

export const cartReducer = cartSlice.reducer
