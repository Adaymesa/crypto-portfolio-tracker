import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';
import { loadState, localStorageMiddleware } from './localStorageMiddleware';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
