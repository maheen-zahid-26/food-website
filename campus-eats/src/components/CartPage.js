import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (itemToRemove) => {
    const updatedCart = cart.filter(item => item.id !== itemToRemove.id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleBackToMenu = () => {
    navigate('/menu'); 
  };

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      sx={{
        padding: '20px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/cartpage.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        justifyContent: 'space-between',
        marginTop:"0.5px"
      }}
    >
      <Grid item>
        <Button
          onClick={handleBackToMenu}
          sx={{
            backgroundColor: 'transparent',
            marginTop: '50px',
            color: 'white',
            padding: '10px',
            position: 'absolute',
            top: '20px',
            left: '20px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              opacity: 0.7,
            },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 30 }} />
          Back to Menu
        </Button>
      </Grid>

      <Grid item>
        {cart.length > 0 ? (
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    borderRadius: '15px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                    },
                    backdropFilter: 'blur(5px)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', padding: '20px' }}>
                    <img
                      src={`http://localhost/Campus-Eats/server/${item.image_path}`}
                      alt={item.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: '15px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        color: '#333',
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        marginTop: '10px',
                        color: '#555',
                        fontSize: '1rem',
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: '15px',
                        fontWeight: 'bold',
                        color: '#1976d2',
                      }}
                    >
                      ${item.price}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        marginTop: '15px',
                        color: '#555',
                        fontSize: '1rem',
                      }}
                    >
                      Quantity: {item.quantity}
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        marginTop: '15px',
                        backgroundColor: '#d32f2f',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#c62828',
                        },
                      }}
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Remove from Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="white" textAlign="center" marginTop="20px">
            Your cart is empty.
          </Typography>
        )}
      </Grid>

      <Grid item container justifyContent="center">
        {cart.length > 0 && (
          <Button
            variant="contained"
            sx={{
              marginTop: '20px',
              backgroundColor: '#1976d2',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              padding: '10px 20px',
              width: '200px',
            }}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default CartPage;
