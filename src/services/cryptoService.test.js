const axios = require('axios');
const { fetchCryptoPrices } = require('./cryptoService');

jest.mock('axios');

describe('cryptoService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches crypto prices successfully', async () => {
    const mockData = {
      bitcoin: { usd: 50000 },
      ethereum: { usd: 3000 }
    };
    axios.get = jest.fn().mockResolvedValue({ data: mockData });

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
    axios.get = jest.fn().mockRejectedValue(mockError);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(fetchCryptoPrices(['bitcoin', 'ethereum'])).rejects.toThrow('API error');

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching crypto prices:', mockError);

    consoleSpy.mockRestore();
  });
});
