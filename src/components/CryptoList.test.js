import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CryptoList from './CryptoList';
import { BrowserRouter as Router } from 'react-router-dom';

describe('CryptoList', () => {
  const mockCryptos = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 2, price: 30000, total: 60000 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: 5, price: 2000, total: 10000 },
  ];

  it('displays cryptocurrencies when the list is not empty', () => {
    render(
      <Router>
        <CryptoList cryptos={mockCryptos} onDelete={() => {}} onEdit={() => {}} />
      </Router>
    );
    expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument();
    expect(screen.getByText('Ethereum (ETH)')).toBeInTheDocument();
  });

  it('displays correct quantity, price, and total for each cryptocurrency', () => {
    render(
      <Router>
        <CryptoList cryptos={mockCryptos} onDelete={() => {}} onEdit={() => {}} />
      </Router>
    );
    
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Price: $30000')).toBeInTheDocument();
    expect(screen.getByText('Total: $60000.00')).toBeInTheDocument();

    expect(screen.getByText('Quantity: 5')).toBeInTheDocument();
    expect(screen.getByText('Price: $2000')).toBeInTheDocument();
    expect(screen.getByText('Total: $10000.00')).toBeInTheDocument();
  });

  it('renders edit and delete buttons for each cryptocurrency', () => {
    render(
      <Router>
        <CryptoList cryptos={mockCryptos} onDelete={() => {}} onEdit={() => {}} />
      </Router>
    );
    
    const editButtons = screen.getAllByText('Edit');
    const deleteButtons = screen.getAllByText('Delete');

    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });

  it('renders a message when there are no cryptocurrencies', () => {
    render(<CryptoList cryptos={[]} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText('No cryptocurrencies in your portfolio.')).toBeInTheDocument();
  });

  it('renders links to detail pages for each cryptocurrency', () => {
    render(
      <MemoryRouter>
        <CryptoList cryptos={mockCryptos} onDelete={() => {}} onEdit={() => {}} />
      </MemoryRouter>
    );
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/details/bitcoin');
    expect(links[1]).toHaveAttribute('href', '/details/ethereum');
  });
});
