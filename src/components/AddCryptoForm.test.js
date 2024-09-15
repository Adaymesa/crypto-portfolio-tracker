import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCryptoForm from './AddCryptoForm';

describe('AddCryptoForm', () => {
  const mockOnAddCrypto = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form inputs', () => {
    render(<AddCryptoForm onAddCrypto={mockOnAddCrypto} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Symbol/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
  });

  it('calls onAddCrypto with form data when submitted', () => {
    render(<AddCryptoForm onAddCrypto={mockOnAddCrypto} />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Bitcoin' } });
    fireEvent.change(screen.getByLabelText(/Symbol/i), { target: { value: 'BTC' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '1' } });
    
    fireEvent.submit(screen.getByRole('form'));
    
    expect(mockOnAddCrypto).toHaveBeenCalledWith({
      name: 'Bitcoin',
      symbol: 'BTC',
      quantity: 1
    });
  });

  it('displays error message for invalid input', () => {
    render(<AddCryptoForm onAddCrypto={mockOnAddCrypto} />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Symbol/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '-1' } });
    
    fireEvent.submit(screen.getByRole('form'));
    
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Symbol is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Quantity must be a positive number/i)).toBeInTheDocument();
    expect(mockOnAddCrypto).not.toHaveBeenCalled();
  });
});
