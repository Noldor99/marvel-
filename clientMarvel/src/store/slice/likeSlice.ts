import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { ICard } from "../../model/cartModel"
import { IHero } from "../../model/heroModel"

interface likeSliceProps {
  likeItems: IHero[]
}

const likeItems = localStorage.getItem("likeItems")
const initialState: likeSliceProps = {
  likeItems: likeItems ? JSON.parse(likeItems) : [],
}

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    TURN_LIKE(state, action: PayloadAction<ICard | IHero>) {
      const productIndex = state.likeItems.findIndex(
        (item) => item.id === action.payload.id
      )
      if (productIndex >= 0) {
        state.likeItems = state.likeItems.filter(
          (item) => item.id !== action.payload.id
        )
        toast.info(`${action.payload.nickname} removed from like`, {
          position: "top-left",
        })
      } else {
        const tempProduct = { ...action.payload }
        state.likeItems.push(tempProduct)
        toast.success(`${action.payload.nickname} added to like`, {
          position: "top-left",
        })
      }
      localStorage.setItem("likeItems", JSON.stringify(state.likeItems))
    },
  },
})

export const likeActions = likeSlice.actions

export const likeReducer = likeSlice.reducer
