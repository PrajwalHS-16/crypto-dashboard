import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoins } from '../redux/slices/coinSlice';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Box,
  CardMedia,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import useWatchlist from '../hooks/useWatchlist';
import { useState } from 'react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { coins, status } = useSelector((state) => state.coins);
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Failed to load coins.</Typography>;

  return (
    <Box mt={3}>
      <Grid container spacing={3} justifyContent="space-around" alignItems="center" >
  {coins.map((coin, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={coin.id} sx={index === 0 ? { gridColumn: '1 / -1' } : {}}>
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

        {!isInWatchlist(coin.id) && (
          <IconButton
            className="add-button"
            onClick={() => addToWatchlist(coin)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#4caf50',
              color: 'white',
              '&:hover': {
                backgroundColor: '#388e3c',
              },
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Card>
    </Grid>
  ))}
</Grid>

      {/* Chatbot Icon */}
      <IconButton
        onClick={toggleChatbot}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#4caf50',
          color: 'white',
          '&:hover': {
            backgroundColor: '#388e3c',
          },
          zIndex: 1000,
        }}
      >
        {isChatbotOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {/* Chatbot Window */}
      {isChatbotOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 300,
            height: 400,
            backgroundColor: '#fff',
            borderRadius: 4,
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/gTs4x6Utp7y9yTmAe2FCH"
            title="Chatbot"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;