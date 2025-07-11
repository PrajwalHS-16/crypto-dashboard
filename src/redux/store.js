import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './slices/coinSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    coins: coinReducer,
    auth: authReducer,
  },
});

export default store;
