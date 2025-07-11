import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          CryptoHive
        </Link>
      </Typography>
      <Button color="inherit" component={Link} to="/watchlist">Watchlist</Button>
    </Toolbar>
  </AppBar>
);

export default Header;
