import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { baseHeroApi } from "./api/baseHeroApi";
import { roleApi } from "./api/roleApi";
import { userApi } from "./api/userApi";
import { authReducer } from "./slice/authSlice";
import { cartReducer } from "./slice/cartSlice";
import { filterReducer } from "./slice/filterSlice";
import { heroReducer } from "./slice/heroSlice";
import { likeReducer } from "./slice/likeSlice";


const rootReducer = combineReducers({
  filter: filterReducer,
  hero: heroReducer,
  auth: authReducer,
  cart: cartReducer,
  like: likeReducer,
  [baseHeroApi.reducerPath]: baseHeroApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    }).concat(
      baseHeroApi.middleware,
      userApi.middleware,
      roleApi.middleware,
    ),
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch