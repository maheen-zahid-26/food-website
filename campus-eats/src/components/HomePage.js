import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ScheduleIcon from '@mui/icons-material/Schedule';


const HomePage = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <video 
        src="homepage.mp4" 
        type="video/mp4" 
        autoPlay 
        loop 
        muted 
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          zIndex: -1,
          
        }} 
      />
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Typography
          variant="h2"
          sx={{ color: 'white', fontWeight: 'bold', marginBottom: 3, letterSpacing: '1px' }}
        >
          Welcome to Campus Eats
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'white', marginBottom: 4, maxWidth: '600px' }}
        >
          Skip the lines and make your dining experience effortless. Explore 
          menus, pre-order your meals, and save time between classes with our 
          intuitive platform.
        </Typography>

        <Grid container spacing={4} justifyContent="center" mb={4}>
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <LocalDiningIcon sx={{ color: '#3f51b5', backgroundColor: '#e8eaf6', padding: 2, borderRadius: '50%', fontSize: 80 }} />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
                Discover Menus
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
                Browse a variety of meal options from nearby cafeterias and restaurants.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FastfoodIcon sx={{ color: '#9c27b0', backgroundColor: '#f3e5f5', padding: 2, borderRadius: '50%', fontSize: 80 }} />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
                Pre-order Your Meal
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
                Order your favorite dishes and have them ready when you need them.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ScheduleIcon sx={{ color: '#4caf50', backgroundColor: '#e8f5e9', padding: 2, borderRadius: '50%', fontSize: 80 }} />
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold', mt: 2 }}>
                Save Time
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
                Avoid long lines and maximize your time between classes.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(to right, #3f51b5, #9c27b0)',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '30px',
            fontSize: '1.2rem',
            '&:hover': {
              background: 'linear-gradient(to right, #303f9f, #7b1fa2)',
            },
          }}
        >
          Explore Now
        </Button>
      </Box>
    </div>
  );
};

export default HomePage;
