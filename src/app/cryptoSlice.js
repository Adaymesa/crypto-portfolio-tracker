import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoinsList, fetchCryptoPrices } from '../services/cryptoService';

export const fetchPrices = createAsyncThunk(
  'crypto/fetchPrices',
  async (coinIds, { getState }) => {
    const prices = await fetchCryptoPrices(coinIds);
    return prices;
  }
);

export const initializeApp = createAsyncThunk(
  'crypto/initializeApp',
  async (_, { dispatch }) => {
    try {
      const coins = await fetchCoinsList();
      return coins;
    } catch (error) {
      console.error('Failed to fetch coins list:', error);
      throw error;
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    cryptos: [],
    allCoins: [],
    status: 'idle',
    error: null,
    pricesFetched: false
  },
  reducers: {
    setAllCoins: (state, action) => {
      state.allCoins = action.payload;
    },
    addCrypto: (state, action) => {
      const matchedCoin = state.allCoins.find(
        coin => coin.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (matchedCoin) {
        state.cryptos.push({
          ...action.payload,
          id: matchedCoin.id,
          symbol: matchedCoin.symbol,
          price: action.payload.price || 0,
          total: (action.payload.price || 0) * action.payload.quantity
        });
        state.error = null;
        state.pricesFetched = false; 
      } else {
        state.error = `Cryptocurrency ${action.payload.name} not found in the list of supported coins`;
      }
    },
    editCrypto: (state, action) => {
      const index = state.cryptos.findIndex(crypto => crypto.id === action.payload.id);
      if (index !== -1) {
        const updatedCrypto = {
          ...state.cryptos[index],
          ...action.payload,
        };
        updatedCrypto.price = action.payload.price || updatedCrypto.price;
        updatedCrypto.total = updatedCrypto.quantity * updatedCrypto.price;
        state.cryptos[index] = updatedCrypto;
      }
    },
    deleteCrypto: (state, action) => {
      state.cryptos = state.cryptos.filter(crypto => crypto.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cryptos = state.cryptos.map(crypto => ({
          ...crypto,
          price: action.payload[crypto.id]?.usd || crypto.price,
          total: (action.payload[crypto.id]?.usd || crypto.price) * crypto.quantity
        }));
        state.pricesFetched = true;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(initializeApp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allCoins = action.payload;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setAllCoins, addCrypto, editCrypto, deleteCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;
