import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomeScreen from './HomeScreen';

const mockStore = configureStore([]);

const mockCryptos = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000, total: 50000 },
  { id: '2', name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000, total: 30000 },
];

describe('HomeScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      crypto: { cryptos: mockCryptos }
    });
  });

  it('renders the correct number of cryptocurrencies', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );
    const cryptoItems = screen.getAllByText(/Bitcoin|Ethereum/);
    expect(cryptoItems).toHaveLength(2);
  });

  it('renders add cryptocurrency link with correct path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );
    const addLink = screen.getByText('Add New Cryptocurrency');
    expect(addLink.getAttribute('href')).toBe('/add');
  });

  it('dispatches delete action with correct payload', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'crypto/deleteCrypto', payload: '1' });
  });

  it('renders edit buttons for each cryptocurrency', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeScreen />
        </MemoryRouter>
      </Provider>
    );
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons).toHaveLength(2);
  });
});