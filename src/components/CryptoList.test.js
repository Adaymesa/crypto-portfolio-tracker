import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CryptoList from './CryptoList';

describe('CryptoList', () => {
  const mockCryptos = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000 },
  ];

  it('renders the component title', () => {
    render(<CryptoList cryptos={[]} />);
    expect(screen.getByText('Crypto Portfolio')).toBeInTheDocument();
  });

  it('displays a list of cryptocurrencies', () => {
    render(<CryptoList cryptos={mockCryptos} />);
    expect(screen.getByText(/Bitcoin \(BTC\)/)).toBeInTheDocument();
    expect(screen.getByText(/Ethereum \(ETH\)/)).toBeInTheDocument();
  });

  it('displays a message when there are no cryptocurrencies', () => {
    render(<CryptoList cryptos={[]} />);
    expect(screen.getByText('No cryptocurrencies in the portfolio.')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(<CryptoList cryptos={mockCryptos} onDelete={mockOnDelete} />);
    
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<CryptoList cryptos={mockCryptos} onDelete={jest.fn()} onEdit={mockOnEdit} />);
    
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockCryptos[0]);
  });
});
