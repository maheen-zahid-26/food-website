import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const initialFormData = {
    customer_name: '',
    address: '',
    contact_number: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    const total = storedCart.reduce((sum, item) => {
      return sum + (item.price * item.quantity || 0);
    }, 0);

    setTotalPrice(total);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('http://localhost/Campus-Eats/server/placeOrder.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, cart }),
      });

      if (response.ok) {
        console.log('Order placed successfully!');
        alert('Your order has been placed successfully!');
        localStorage.removeItem('cart');
        setCart([]);
        setFormData(initialFormData);
        
      } else {
        console.error('Failed to place the order:', await response.text());
        alert('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error while placing the order:', error);
      alert('An error occurred. Please check your network and try again.');
    }
  };

  const formattedTotalPrice = !isNaN(totalPrice) ? totalPrice.toFixed(2) : '0.00';

  return (
    <>
   
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/cart.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',  
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
       
        <Box
          style={{
            padding: '20px',
            maxWidth: '400px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',  
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h4" style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>
            Checkout
          </Typography>

          <TextField
            fullWidth
            label="Name"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            style={{ marginBottom: '20px', background: '#fff', borderRadius: '4px' }}
          />

          <TextField
            fullWidth
            label="Contact Number"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleInputChange}
            style={{ marginBottom: '20px', background: '#fff', borderRadius: '4px' }}
          />

          <Typography
            variant="h6"
            style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}
          >
            Total: Rs.{formattedTotalPrice}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            style={{ padding: '15px', background: '#ff5722' }}
            fullWidth
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Box>
      </div>
    </>
  );
}

export default CheckoutPage;
