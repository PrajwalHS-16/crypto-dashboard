import axios from 'axios';

export const getTopCoins = async () =>
  axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
    },
  });

export const getCoinDetails = async (id) =>
  axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
