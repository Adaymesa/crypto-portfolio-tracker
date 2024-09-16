import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer, { fetchCoinsAndPrices, addCrypto } from './CryptoSlice';
import { fetchCoinsList, fetchCryptoPrices } from '../services/cryptoService';

jest.mock('../services/cryptoService');

describe('cryptoSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        crypto: cryptoReducer,
      },
    });
  });

  it('should handle fetchCoinsAndPrices', async () => {
    const mockCoins = [{ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' }];
    const mockPrices = { bitcoin: { usd: 50000 } };
    
    fetchCoinsList.mockResolvedValue(mockCoins);
    fetchCryptoPrices.mockResolvedValue(mockPrices);

    await store.dispatch(fetchCoinsAndPrices());

    const state = store.getState().crypto;

    expect(state.status).toBe('succeeded');
    expect(state.coinsList).toEqual(mockCoins);
    expect(state.cryptos).toEqual([]);
  });

  it('should update prices for existing cryptos', async () => {
    store.dispatch(addCrypto({ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 1 }));

    const mockCoins = [{ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' }];
    const mockPrices = { bitcoin: { usd: 50000 } };
    
    fetchCoinsList.mockResolvedValue(mockCoins);
    fetchCryptoPrices.mockResolvedValue(mockPrices);

    await store.dispatch(fetchCoinsAndPrices());

    const state = store.getState().crypto;

    expect(state.status).toBe('succeeded');
    expect(state.coinsList).toEqual(mockCoins);
    expect(state.cryptos[0].price).toBe(50000);
    expect(state.cryptos[0].total).toBe(50000);
  });

  it('should add a new crypto with initial price of 0', () => {
    store.dispatch(addCrypto({ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 1 }));

    const state = store.getState().crypto;

    expect(state.cryptos).toHaveLength(1);
    expect(state.cryptos[0]).toEqual({
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      quantity: 1,
      price: 0,
      total: 0
    });
  });
});
