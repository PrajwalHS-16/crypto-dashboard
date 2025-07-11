import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  CardMedia,
  Box,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import useWatchlist from '../hooks/useWatchlist';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (!watchlist.length) {
    return <Typography sx={{ mt: 4 }}>Your watchlist is empty.</Typography>;
  }

  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        {watchlist.map((coin) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={coin.id}>
            <Card
              sx={{
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: 3,
                background: 'linear-gradient(145deg, #1e1e1e, #2c2c2c)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                },
              }}
            >
              <Link to={`/coin/${coin.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardContent>
                  <CardMedia
                    component="img"
                    image={coin.image}
                    alt={coin.name}
                    sx={{
                      width: 40,
                      height: 40,
                      mb: 1,
                      borderRadius: '50%',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.2)' },
                    }}
                  />
                  <Typography variant="h6">{coin.name}</Typography>
                  <Typography variant="body2">Price: ${coin.current_price}</Typography>
                  <Typography variant="body2">Market Cap: ${coin.market_cap.toLocaleString()}</Typography>
                </CardContent>
              </Link>

              <IconButton
                onClick={() => removeFromWatchlist(coin.id)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: '#e53935',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                  },
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
     </Box>
  );
};

export default Watchlist;
