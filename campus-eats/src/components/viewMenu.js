import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

function ViewMenu() {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({}); // Track quantity for each item

  const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage']; // Predefined categories

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`http://localhost/Campus-Eats/server/menu.php?restaurantId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu');
        }
        const data = await response.json();
        setMenu(data);
        const initialQuantities = data.reduce((acc, item) => {
          acc[item.id] = 1; // Set default quantity for each item to 1
          return acc;
        }, {});
        setQuantities(initialQuantities); // Initialize quantities state
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, [id]);

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    const quantity = quantities[item.id]; // Get the selected quantity

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity; // Increase quantity if item already in cart
    } else {
      cart.push({ ...item, quantity }); // Add new item to cart with selected quantity
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to local storage
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: Math.max(1, prevQuantities[itemId] + value), // Ensure quantity can't go below 1
    }));
  };

  const groupedMenu = categories.reduce((acc, category) => {
    acc[category] = menu.filter(item => item.category === category);
    return acc;
  }, {});

  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: '20px',
        marginTop: '1px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/mainpagemenu.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {categories.map((category) => {
        const categoryItems = groupedMenu[category];
        if (categoryItems.length === 0) return null; // Skip category if no items are available

        return (
          <Grid item xs={12} key={category}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#1976d2',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              {category}
            </Typography>

            <Grid container spacing={3}>
              {categoryItems.map((item) => (
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
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', padding: '20px' }}>
                      <img
                        src={`http://localhost/Campus-Eats/server/${item.image_path}`}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                        }}
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

                      <div style={{ marginTop: '15px' }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#1565c0',
                            },
                          }}
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={quantities[item.id] === 1}
                        >
                          -
                        </Button>
                        <Typography
                          variant="body1"
                          sx={{
                            display: 'inline-block',
                            margin: '0 10px',
                            fontWeight: 'bold',
                            color: '#333',
                          }}
                        >
                          {quantities[item.id]}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#1565c0',
                            },
                          }}
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </Button>
                      </div>

                      <Button
                        variant="contained"
                        sx={{
                          marginTop: '15px',
                          backgroundColor: '#1976d2',
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#1565c0',
                          },
                        }}
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ViewMenu;
