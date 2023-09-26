import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserInfo } from '../../model/userModel';


interface AuthState {
  userInfo: IUserInfo | null;
}

const getStoredUserInfo = (): IUserInfo | null => {
  const storedData = localStorage.getItem('userInfo');
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
};

const initialState: AuthState = {
  userInfo: getStoredUserInfo(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserInfo | null>) => {
      state.userInfo = action.payload;
      if (action.payload !== null) {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('userInfo');
      }
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
