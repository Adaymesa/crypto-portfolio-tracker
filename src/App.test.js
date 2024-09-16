import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { fetchCryptoPrices, fetchCoinsList } from './services/cryptoService';

jest.mock('./services/cryptoService');

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    fetchCryptoPrices.mockResolvedValue({
      bitcoin: { usd: 50000 },
      ethereum: { usd: 3000 }
    });
    fetchCoinsList.mockResolvedValue([
      { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
      { id: 'ethereum', symbol: 'eth', name: 'Ethereum' }
    ]);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('fetches coins list on mount', async () => {
    await act(async () => {
      render(<App />);
      jest.runAllTimers();
    });

    expect(fetchCoinsList).toHaveBeenCalledTimes(1);
  });

  it('displays loading state while fetching coins list', async () => {
    let resolvePromise;
    fetchCoinsList.mockImplementationOnce(() => new Promise(resolve => {
      resolvePromise = resolve;
    }));

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await act(async () => {
      resolvePromise([]);
      jest.runAllTimers();
    });

    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  it('displays error message if fetching coins list fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetchCoinsList.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      render(<App />);
      jest.runAllTimers();
    });

    expect(screen.getByText(/Failed to fetch coins list/i)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
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
