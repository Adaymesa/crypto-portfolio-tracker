import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCryptoForm from './AddCryptoForm';

describe('AddCryptoForm', () => {
  it('renders form inputs', () => {
    render(<AddCryptoForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Symbol/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Cryptocurrency/i })).toBeInTheDocument();
  });

  it('calls onAddCrypto with form data when submitted', () => {
    const mockOnAddCrypto = jest.fn();
    render(<AddCryptoForm onAddCrypto={mockOnAddCrypto} />);
    
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Bitcoin' } });
    fireEvent.change(screen.getByLabelText(/Symbol/i), { target: { value: 'BTC' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '1' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Add Cryptocurrency/i }));
    
    expect(mockOnAddCrypto).toHaveBeenCalledWith({
      name: 'Bitcoin',
      symbol: 'BTC',
      quantity: 1
    });
  });
});
