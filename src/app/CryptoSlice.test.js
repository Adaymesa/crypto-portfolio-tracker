import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer, { fetchPrices, initializeApp, addCrypto, editCrypto, deleteCrypto, setAllCoins } from './cryptoSlice';
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

  it('should handle fetchPrices', async () => {
    const mockPrices = { bitcoin: { usd: 50000 } };
    
    fetchCryptoPrices.mockResolvedValue(mockPrices);

    await store.dispatch(fetchPrices(['bitcoin']));

    const state = store.getState().crypto;

    expect(state.status).toBe('succeeded');
    expect(state.cryptos).toEqual([]);
  });

  it('should update prices for existing cryptos', async () => {
    store.dispatch(setAllCoins([{ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' }]));
    store.dispatch(addCrypto({ name: 'Bitcoin', symbol: 'BTC', quantity: 1 }));

    const mockPrices = { bitcoin: { usd: 50000 } };
    
    fetchCryptoPrices.mockResolvedValue(mockPrices);

    await store.dispatch(fetchPrices(['bitcoin']));

    const state = store.getState().crypto;

    expect(state.status).toBe('succeeded');
    expect(state.cryptos[0].price).toBe(50000);
    expect(state.cryptos[0].total).toBe(50000);
  });

  it('should handle initializeApp', async () => {
    const mockCoins = [{ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' }];
    
    fetchCoinsList.mockResolvedValue(mockCoins);

    await store.dispatch(initializeApp());

    const state = store.getState().crypto;

    expect(state.status).toBe('succeeded');
    expect(state.allCoins).toEqual(mockCoins);
  });

  it('should not add a new crypto if the name is not found in allCoins', () => {
    store.dispatch(setAllCoins([{ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' }]));
    store.dispatch(addCrypto({ name: 'Ethereum', symbol: 'ETH', quantity: 1 }));

    const state = store.getState().crypto;

    expect(state.cryptos).toHaveLength(0);
    expect(state.error).toBe('Cryptocurrency Ethereum not found in the list of supported coins');
  });

  it('should add a new crypto when the name is found in allCoins', () => {
    store.dispatch(setAllCoins([{ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' }]));
    store.dispatch(addCrypto({ name: 'Bitcoin', symbol: 'WRONGSYMBOL', quantity: 1 }));

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
    expect(state.error).toBeNull();
  });

  it('should edit an existing crypto', () => {
    store.dispatch(setAllCoins([{ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' }]));
    store.dispatch(addCrypto({ name: 'Bitcoin', symbol: 'BTC', quantity: 1 }));
    store.dispatch(editCrypto({ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 2 }));

    const state = store.getState().crypto;

    expect(state.cryptos).toHaveLength(1);
    expect(state.cryptos[0].quantity).toBe(2);
  });

  it('should delete an existing crypto', () => {
    store.dispatch(addCrypto({ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 1 }));
    store.dispatch(deleteCrypto('bitcoin'));

    const state = store.getState().crypto;

    expect(state.cryptos).toHaveLength(0);
  });
});
