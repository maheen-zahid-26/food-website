import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function OrderConfirmationPage() {
  return (
    <Box textAlign="center" style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Thank you for your order!
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '40px' }}>
        Your meal will be ready shortly.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Back to Home
      </Button>
    </Box>
  );
}

export default OrderConfirmationPage;
