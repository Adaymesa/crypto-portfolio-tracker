import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomeScreen from './HomeScreen';

jest.mock('../components/CryptoList', () => {
  return function MockCryptoList({ cryptos, onDelete, onEdit }) {
    return (
      <div data-testid="crypto-list">
        {cryptos.length} cryptocurrencies
        <button onClick={() => onDelete('1')}>Delete</button>
        <button onClick={() => onEdit('1')}>Edit</button>
      </div>
    );
  };
});

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

  it('renders the cryptocurrency list', () => {
    render(
      <Provider store={store}>
        <Router>
          <HomeScreen />
        </Router>
      </Provider>
    );
    expect(screen.getByTestId('crypto-list')).toHaveTextContent('2 cryptocurrencies');
  });

  it('renders the add new cryptocurrency link', () => {
    render(
      <Provider store={store}>
        <Router>
          <HomeScreen />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Add New Cryptocurrency')).toBeInTheDocument();
  });

  it('handles delete and edit actions', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <HomeScreen />
        </Router>
      </Provider>
    );
    
    fireEvent.click(getByText('Delete'));
    expect(store.getActions()).toContainEqual({ type: 'crypto/deleteCrypto', payload: '1' });

    fireEvent.click(getByText('Edit'));
    expect(() => fireEvent.click(getByText('Edit'))).not.toThrow();
  });
});