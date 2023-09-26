import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface filterSliceProps {
  currentPage: number
  search: string
}

const initialState: filterSliceProps = {
  currentPage: 1,
  search: "",
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCurrentPageAction: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchAction: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const filterActions = filterSlice.actions

export const filterReducer = filterSlice.reducer
