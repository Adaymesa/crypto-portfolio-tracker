import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CryptoList from './CryptoList';

describe('CryptoList', () => {
  it('renders the component title', () => {
    render(<CryptoList />);
    expect(screen.getByText('Crypto Portfolio')).toBeInTheDocument();
  });

  it('displays a list of cryptocurrencies', () => {
    const cryptos = [
      { id: 1, name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000 },
      { id: 2, name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000 },
    ];
    render(<CryptoList cryptos={cryptos} />);
    expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument();
    expect(screen.getByText('Ethereum (ETH)')).toBeInTheDocument();
  });
});
