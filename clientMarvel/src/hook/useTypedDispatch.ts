import { useDispatch } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { filterActions } from "../store/slice/filterSlice"
import { heroActions } from "../store/slice/heroSlice"
import { authActions } from "../store/slice/authSlice"
import { cartActions } from "../store/slice/cartSlice"
import { likeActions } from "../store/slice/likeSlice"

const actions = {
  ...heroActions,
  ...filterActions,
  ...authActions,
  ...cartActions,
  ...likeActions,
}

export const useTypedDispatch = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
