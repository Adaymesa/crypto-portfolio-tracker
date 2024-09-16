import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import { fetchCoinsAndPrices } from '../app/CryptoSlice';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../components/CryptoList', () => () => <div>Mocked CryptoList</div>);

const mockCryptos = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000, total: 50000 },
  { id: '2', name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000, total: 30000 },
];

describe('HomeScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      crypto: { cryptos: mockCryptos, status: 'idle', error: null }
    });
  });

  it('dispatches fetchCoinsAndPrices on mount', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchCoinsAndPrices.pending.type);
  });
});