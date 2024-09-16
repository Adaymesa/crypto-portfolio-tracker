import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoinsList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coins list:', error);
    throw error;
  }
};

export const fetchCryptoPrices = async (coinIds) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/simple/price`, {
      params: {
        ids: coinIds.join(','),
        vs_currencies: 'usd'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};
