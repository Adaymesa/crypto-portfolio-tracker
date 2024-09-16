import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './CryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});
