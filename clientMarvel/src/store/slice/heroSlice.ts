import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IHero } from "../../model/heroModel"

import { heroApi } from "../api/heroApi"

interface heroSliceProps {
  heroes: IHero[] | []
  totalPage: number
  minPrice: number
  maxPrice: number
  currentBrand: string
  currentRange: number | null
}

const initialState: heroSliceProps = {
  heroes: [],
  totalPage: 2,
  minPrice: 0,
  maxPrice: 0,
  currentBrand: "All",
  currentRange: null,
}

const heroSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    setHeros: (state, action: PayloadAction<IHero[]>) => {
      state.heroes = action.payload
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload
    },
    setCurrentRange: (state, action: PayloadAction<number>) => {
      state.currentRange = action.payload
    },
    setCurrentBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload
      if (brand === "All") {
        state.currentBrand = "All"
      }
      if (brand !== "All") {
        state.currentBrand = brand
      }
    },
    clearFillter: (state) => {
      state.currentRange = null
      state.currentBrand = "All"
    },
    SORT_HEROES(state, action: PayloadAction<{ sort: string }>) {
      const { sort } = action.payload
      let tempProducts: IHero[] = []
      console.log(sort)
      if (sort === "latest") {
        tempProducts = state.heroes.slice()
      } else if (sort === "lowest-price") {
        tempProducts = state.heroes.slice().sort((a, b) => a.price - b.price)
      } else if (sort === "highest-price") {
        tempProducts = state.heroes.slice().sort((a, b) => b.price - a.price)
      } else if (sort === "a-z") {
        tempProducts = state.heroes
          .slice()
          .sort((a, b) => a.nickname.localeCompare(b.nickname))
      } else if (sort === "z-a") {
        tempProducts = state.heroes
          .slice()
          .sort((a, b) => b.nickname.localeCompare(a.nickname))
      }
      console.log(tempProducts)
      state.heroes = tempProducts
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      heroApi.endpoints.getHeroesWithPagination.matchFulfilled,
      (state, { payload }) => {
        state.heroes = payload.heroes
        state.totalPage = Math.ceil(payload.total / 4)
        state.maxPrice = payload.maxPrice
      }
    )
    builder.addMatcher(
      heroApi.endpoints.getSearchHero.matchFulfilled,
      (state, { payload }) => {
        console.log(payload)
        if (payload) {
          state.heroes = payload
        }
      }
    )
  },
})

export const heroActions = heroSlice.actions
export const heroReducer = heroSlice.reducer
