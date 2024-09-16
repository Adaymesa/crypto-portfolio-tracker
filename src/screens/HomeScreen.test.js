import React from 'react';
import { render, waitFor } from '@testing-library/react';
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

describe('HomeScreen', () => {
  let store;

  beforeEach(() => {
    fetchPrices.mockClear();
  });

  it('dispatches fetchPrices only for cryptos without price on mount', async () => {
    const mockCryptos = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000, total: 50000 },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: 10, price: null, total: null },
    ];

    store = mockStore({
      crypto: { cryptos: mockCryptos, status: 'idle', error: null }
    });

    fetchPrices.mockReturnValue({ type: 'crypto/fetchPrices/pending' });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetchPrices).toHaveBeenCalledWith(['ethereum']);
    });
  });

  it('does not dispatch fetchPrices when all cryptos have prices', async () => {
    const mockCryptos = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000, total: 50000 },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000, total: 30000 },
    ];

    store = mockStore({
      crypto: { cryptos: mockCryptos, status: 'idle', error: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetchPrices).not.toHaveBeenCalled();
    });
  });
});