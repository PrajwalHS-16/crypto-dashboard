import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PriceChart from '../charts/PriceChart';
import { Typography, Box, CircularProgress } from '@mui/material';

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const [coinRes, chartRes] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`),
        ]);
        setCoin(coinRes.data);
        setChartData(chartRes.data.prices);
      } catch (error) {
        console.error("Failed to load coin data:", error);
        setCoin(null); // Reset coin data on failure
        setChartData([]); // Reset chart data on failure
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!coin) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          Failed to load coin data. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4">{coin.name}</Typography>
      <Typography variant="body1">{coin.description?.en?.split('. ')[0]}</Typography>
      <Box mt={4}>
        <PriceChart chartData={chartData} />
      </Box>
    </Box>
  );
};

export default CoinDetail;



