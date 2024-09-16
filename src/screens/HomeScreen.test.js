import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { fetchPrices } from '../app/cryptoSlice';

jest.mock('../app/cryptoSlice', () => ({
  ...jest.requireActual('../app/cryptoSlice'),
  fetchPrices: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../components/CryptoList', () => () => <div>Mocked CryptoList</div>);

const mockCryptos = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000, total: 50000 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000, total: 30000 },
];

describe('HomeScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      crypto: { cryptos: mockCryptos, status: 'idle', error: null }
    });
    fetchPrices.mockClear();
  });

  it('dispatches fetchPrices with correct coin IDs on mount', async () => {
    fetchPrices.mockReturnValue({ type: 'crypto/fetchPrices/pending' });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetchPrices).toHaveBeenCalledWith(['bitcoin', 'ethereum']);
    });
  });

  it('calls fetchPrices when cryptos change', async () => {
    fetchPrices.mockReturnValue({ type: 'crypto/fetchPrices/pending' });

    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );

    store = mockStore({
      crypto: { 
        cryptos: [...mockCryptos, { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', quantity: 100, price: 0.5, total: 50 }],
        status: 'idle',
        error: null
      }
    });

    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetchPrices).toHaveBeenCalledTimes(2);
      expect(fetchPrices).toHaveBeenLastCalledWith(['bitcoin', 'ethereum', 'dogecoin']);
    });
  });
});