import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AssignmentIcon from '@mui/icons-material/Assignment';  
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; 

function Navbar() {
  return (
    <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
      <Toolbar>
        
        <FastfoodIcon sx={{ fontSize: 40, marginRight: '10px' }} />
        
        <Typography variant="h6" style={{ flexGrow: 1, fontSize: '1.5rem' }}>
          CAMPUS EATS
        </Typography>
        
        <Button
          color="inherit"
          component={Link}
          to="/"
          startIcon={<HomeIcon sx={{ fontSize: 28 }} />}
          sx={{ fontSize: '1.2rem', padding: '10px' }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/menu"
          startIcon={<MenuIcon sx={{ fontSize: 28 }} />}
          sx={{ fontSize: '1.2rem', padding: '10px' }}
        >
          Menu
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/cart"
          startIcon={<ShoppingCartIcon sx={{ fontSize: 28 }} />}
          sx={{ fontSize: '1.2rem', padding: '10px' }}
        >
          Cart
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/customerorders"
          startIcon={<AssignmentIcon sx={{ fontSize: 28 }} />}
          sx={{ fontSize: '1.2rem', padding: '10px' }}
        >
          Orders
        </Button>
        
        <Button
          color="inherit"
          component={Link}
          to="/deals"
          startIcon={<LocalOfferIcon sx={{ fontSize: 28 }} />}
          sx={{ fontSize: '1.2rem', padding: '10px' }}
        >
          Deals
        </Button>
        
        <Button
          color="inherit"
          component={Link}
          to="/login"
          startIcon={<AccountCircleIcon sx={{ fontSize: 28 }} />}
          sx={{ fontSize: '1.2rem', padding: '10px' }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
