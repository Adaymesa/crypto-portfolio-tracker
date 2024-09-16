import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { fetchCryptoPrices, fetchCoinsList } from './services/cryptoService';

jest.mock('./services/cryptoService');

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(JSON.stringify([
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 1 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: 10 }
  ]));

  fetchCoinsList.mockResolvedValue([
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' }
  ]);
  fetchCryptoPrices.mockResolvedValue({
    bitcoin: { usd: 50000 },
    ethereum: { usd: 3000 }
  });
});

describe('App', () => {
  it('fetches coins list on mount', async () => {
    await act(async () => {
      render(<App />);
    });
    await waitFor(() => expect(fetchCoinsList).toHaveBeenCalledTimes(1));
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText(/Crypto Portfolio/i)).toBeInTheDocument();
  });
  
  it('fetches and displays crypto prices', async () => {
    await act(async () => {
      render(<App />);
    });
  
    await waitFor(() => expect(fetchCoinsList).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(fetchCryptoPrices).toHaveBeenCalledTimes(1));
  
    expect(screen.getByText(/Bitcoin \(BTC\)/)).toBeInTheDocument();
    expect(screen.getByText(/Price: \$50000/)).toBeInTheDocument();
    expect(screen.getByText(/Ethereum \(ETH\)/)).toBeInTheDocument();
    expect(screen.getByText(/Price: \$3000/)).toBeInTheDocument();
  });

  it('displays error message if fetching coins list fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetchCoinsList.mockRejectedValueOnce(new Error('API Error'));
  
    render(<App />);
  
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  
    expect(screen.getByTestId('error-message')).toHaveTextContent(/Failed to fetch coins list/i);
  
    consoleErrorSpy.mockRestore();
  });
});

