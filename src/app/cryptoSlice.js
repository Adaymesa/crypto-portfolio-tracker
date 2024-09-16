import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoinsList, fetchCryptoPrices } from '../services/cryptoService';

export const fetchCoinsAndPrices = createAsyncThunk(
  'crypto/fetchCoinsAndPrices',
  async (_, { getState }) => {
    const coins = await fetchCoinsList();
    const state = getState();
    const coinIds = state.crypto.cryptos.map(crypto => crypto.id);
    const prices = await fetchCryptoPrices(coinIds);
    return { coins, prices };
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    cryptos: [],
    coinsList: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addCrypto: (state, action) => {
      state.cryptos.push({ ...action.payload, price: 0, total: 0 });
    },
    editCrypto: (state, action) => {
      const index = state.cryptos.findIndex(crypto => crypto.id === action.payload.id);
      if (index !== -1) {
        state.cryptos[index] = action.payload;
      }
    },
    deleteCrypto: (state, action) => {
      state.cryptos = state.cryptos.filter(crypto => crypto.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinsAndPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoinsAndPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coinsList = action.payload.coins;
        state.cryptos = state.cryptos.map(crypto => ({
          ...crypto,
          price: action.payload.prices[crypto.id]?.usd || 0,
          total: (action.payload.prices[crypto.id]?.usd || 0) * crypto.quantity
        }));
      })
      .addCase(fetchCoinsAndPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addCrypto, editCrypto, deleteCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;
