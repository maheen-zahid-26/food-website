import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 

function MenuPage() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost/Campus-Eats/server/getRestaurants.php');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleViewMenu = (id) => {
    navigate(`/viewmenu/${id}`);
  };

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
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
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
                  src={`http://localhost/Campus-Eats/server/${restaurant.logo}`}
                  alt={restaurant.restaurant_name}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />

                <Typography
                  variant="h6"
                  sx={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}
                >
                  {restaurant.restaurant_name}
                </Typography>

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
                  onClick={() => handleViewMenu(restaurant.id)} 
                >
                  View Menu
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" textAlign="center" marginTop="20px">
          No restaurants available.
        </Typography>
      )}
    </Grid>
  );
}

export default MenuPage;
