import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditCryptoForm from './EditCryptoForm';

describe('EditCryptoForm', () => {
  const mockCrypto = { id: 1, name: 'Bitcoin', symbol: 'BTC', quantity: 1 };
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with crypto data', () => {
    render(<EditCryptoForm crypto={mockCrypto} onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    expect(screen.getByDisplayValue('Bitcoin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('BTC')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('calls onSave with updated data when form is submitted', () => {
    render(<EditCryptoForm crypto={mockCrypto} onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    fireEvent.change(screen.getByDisplayValue('Bitcoin'), { target: { value: 'Ethereum' } });
    fireEvent.change(screen.getByDisplayValue('BTC'), { target: { value: 'ETH' } });
    fireEvent.change(screen.getByDisplayValue('1'), { target: { value: '2' } });
    
    fireEvent.submit(screen.getByLabelText('Edit Cryptocurrency Form'));
    
    expect(mockOnSave).toHaveBeenCalledWith({ 
      ...mockCrypto, 
      name: 'Ethereum', 
      symbol: 'ETH', 
      quantity: 2 
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<EditCryptoForm crypto={mockCrypto} onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('updates form fields when crypto prop changes', () => {
    const { rerender } = render(<EditCryptoForm crypto={mockCrypto} onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    const newCrypto = { ...mockCrypto, name: 'Ethereum', symbol: 'ETH', quantity: 2 };
    rerender(<EditCryptoForm crypto={newCrypto} onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    expect(screen.getByDisplayValue('Ethereum')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ETH')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });
});
