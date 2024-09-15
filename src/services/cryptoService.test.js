import axios from 'axios';
import { fetchCryptoPrices } from './cryptoService';

jest.mock('axios');

describe('cryptoService', () => {
  it('fetches crypto prices successfully', async () => {
    const mockData = {
      bitcoin: { usd: 50000 },
      ethereum: { usd: 3000 }
    };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await fetchCryptoPrices(['bitcoin', 'ethereum']);
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
  });
});
