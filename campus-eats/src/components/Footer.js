import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <Box style={{ backgroundColor: '#3f51b5', padding: '10px' }} display="flex" justifyContent="space-between" alignItems="center">
      
      <Typography variant="body2" color="white">
        © 2024 Campus Eats. All Rights Reserved.
      </Typography>

      
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="white" style={{ marginRight: '10px' }}>
          You can follow us on:
        </Typography>
        <IconButton color="inherit" aria-label="Facebook" href="https://facebook.com">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Instagram" href="https://instagram.com">
          <InstagramIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Twitter" href="https://twitter.com">
          <TwitterIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
