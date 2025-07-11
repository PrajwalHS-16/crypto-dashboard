import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Typography, Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StarIcon from '@mui/icons-material/Star';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(true); // State for open/closed sidebar
  const drawerWidth = open ? 240 : 72;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: drawerWidth,
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          backgroundColor: '#1e1e1e',
          color: '#ffffff', // Change font color to white
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Arial', // Change font family to Arial
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'space-between' : 'center', p: 2 }}>
        {open && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CurrencyBitcoinIcon sx={{ color: '#f2a900' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              CryptoHive
            </Typography>
          </Box>
        )}
        <IconButton onClick={toggleDrawer} sx={{ color: '#ffffff' }}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: '#ffffff', minWidth: open ? 40 : 0 }}>
            <DashboardIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" sx={{ color: '#ffffff' }} />}
        </ListItem>

        <ListItem button component={Link} to="/watchlist">
          <ListItemIcon sx={{ color: '#ffffff', minWidth: open ? 40 : 0 }}>
            <StarIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Watchlist" sx={{ color: '#ffffff' }} />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;