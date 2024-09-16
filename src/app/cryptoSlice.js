import { createSlice } from '@reduxjs/toolkit';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    cryptos: []
  },
  reducers: {
    addCrypto: (state, action) => {
      state.cryptos.push({ ...action.payload, id: Date.now().toString() });
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
  }
});

export const { addCrypto, editCrypto, deleteCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;
