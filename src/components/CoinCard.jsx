import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CoinCard = ({ coin }) => (
  <Card sx={{ m: 2, width: 250 }} component={Link} to={`/coin/${coin.id}`} style={{ textDecoration: 'none' }}>
    <CardContent>
      <Typography variant="h6">{coin.name}</Typography>
      <Typography color="text.secondary">${coin.current_price.toLocaleString()}</Typography>
      <Typography variant="body2" color={coin.price_change_percentage_24h > 0 ? 'green' : 'red'}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </Typography>
    </CardContent>
  </Card>
);

export default CoinCard;
