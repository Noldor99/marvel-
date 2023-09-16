import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHero } from "../../model";
import { heroApi } from "../api/heroApi";


interface heroSliceProps {
  heroes: IHero[] | [];
  totalPage: number;
}

const initialState: heroSliceProps = {
  heroes: [],
  totalPage: 2,
};

const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeros: (state, action: PayloadAction<IHero[]>) => {
      state.heroes = action.payload;
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(heroApi.endpoints.getHeroesWithPagination.matchFulfilled, (state, { payload }) => {
        state.heroes = payload.heroes;
        state.totalPage = Math.ceil(payload.total / 4);
      })
  },
});

export const heroActions = heroSlice.actions;
export const heroReducer = heroSlice.reducer;
