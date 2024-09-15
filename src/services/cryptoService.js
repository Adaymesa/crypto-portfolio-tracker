const axios = require('axios');

const BASE_URL = 'https://api.coingecko.com/api/v3';

const fetchCryptoPrices = async (cryptoIds) => {
  try {
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: cryptoIds.join(','),
        vs_currencies: 'usd'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};

module.exports = { fetchCryptoPrices };
