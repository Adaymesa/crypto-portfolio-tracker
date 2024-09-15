import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
const { fetchCryptoPrices } = require('./services/cryptoService');

jest.mock('./services/cryptoService');

describe('App', () => {
  beforeEach(() => {
    fetchCryptoPrices.mockResolvedValue({
      bitcoin: { usd: 50000 },
      ethereum: { usd: 3000 }
    });
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Crypto Portfolio/i)).toBeInTheDocument();
    });
  });

  it('fetches and displays crypto prices', async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Bitcoin \(BTC\)/)).toBeInTheDocument();
      expect(screen.getByText(/Price: \$50000/)).toBeInTheDocument();
      expect(screen.getByText(/Ethereum \(ETH\)/)).toBeInTheDocument();
      expect(screen.getByText(/Price: \$3000/)).toBeInTheDocument();
    });

    expect(fetchCryptoPrices).toHaveBeenCalledTimes(1);
  });
});
