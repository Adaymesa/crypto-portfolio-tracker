import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import CryptoList from '../components/CryptoList';

// Mock the CryptoList component
jest.mock('../components/CryptoList', () => {
  return function MockCryptoList({ cryptos }) {
    return <div data-testid="crypto-list">{cryptos.length} cryptocurrencies</div>;
  };
});

const mockCryptos = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000, total: 50000 },
  { id: '2', name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000, total: 30000 },
];

describe('HomeScreen', () => {
  it('renders the cryptocurrency list', () => {
    render(
      <Router>
        <HomeScreen cryptos={mockCryptos} onDelete={() => {}} />
      </Router>
    );
    expect(screen.getByTestId('crypto-list')).toHaveTextContent('2 cryptocurrencies');
  });

  it('renders the add new cryptocurrency link', () => {
    render(
      <Router>
        <HomeScreen cryptos={mockCryptos} onDelete={() => {}} />
      </Router>
    );
    expect(screen.getByText('Add New Cryptocurrency')).toBeInTheDocument();
  });
});
