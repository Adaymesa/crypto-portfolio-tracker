import axios from 'axios';
import { fetchCoinsList, fetchCryptoPrices } from './cryptoService';

jest.mock('axios');

describe('cryptoService', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('fetchCoinsList', () => {
    it('fetches coins list successfully', async () => {
      const mockData = [
        { id: '01coin', symbol: 'zoc', name: '01coin' },
        { id: '0chain', symbol: 'zcn', name: 'Zus' }
      ];
      axios.get.mockResolvedValue({ data: mockData });

      const result = await fetchCoinsList();
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('https://api.coingecko.com/api/v3/coins/list');
    });

    it('handles errors when fetching coins list', async () => {
      const mockError = new Error('API error');
      axios.get.mockRejectedValue(mockError);

      await expect(fetchCoinsList()).rejects.toThrow('API error');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching coins list:', mockError);
    });
  });

  describe('fetchCryptoPrices', () => {
    it('fetches crypto prices successfully', async () => {
      const mockData = {
        bitcoin: { usd: 50000 },
        ethereum: { usd: 3000 }
      };
      axios.get.mockResolvedValue({ data: mockData });

      const cryptos = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' }
      ];
      const result = await fetchCryptoPrices(cryptos);
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: 'bitcoin,ethereum',
            vs_currencies: 'usd'
          }
        }
      );
    });

    it('handles errors when fetching crypto prices', async () => {
      const mockError = new Error('API error');
      axios.get.mockRejectedValue(mockError);

      await expect(fetchCryptoPrices(['bitcoin', 'ethereum'])).rejects.toThrow('API error');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching crypto prices:', mockError);
    });
  });
});
