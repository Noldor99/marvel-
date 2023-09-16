import { useDispatch } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { filterActions } from "../store/slice/filterSlice"
import { heroActions } from "../store/slice/heroSlice"

const actions = {
  ...heroActions,
  ...filterActions,
}

export const useTypedDispatch = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
