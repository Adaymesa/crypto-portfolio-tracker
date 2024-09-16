import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptoPrices = async (cryptos) => {
  try {
    const ids = cryptos.map(crypto => crypto.id).join(',');
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: ids,
        vs_currencies: 'usd'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};

export const fetchCoinsList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coins list:', error);
    throw error;
  }
};
