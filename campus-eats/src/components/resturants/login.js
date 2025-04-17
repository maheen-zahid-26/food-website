import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/Campus-Eats/server/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Login successful!');

    
        if (data.user_id) {
          localStorage.setItem('restaurantId', data.user_id);
        }

        navigate('/restaurantMenu');
        console.log('Login details:', data);
      } 
      else {
        alert(data.message || 'Login failed!');
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/login.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper elevation={3} style={{ padding: '20px', width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography variant="h5" align="center" gutterBottom>
          RESTAURANT LOGIN
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box textAlign="center" marginTop="20px">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>

          <Box textAlign="center" marginTop="10px">
            <Typography variant="body2">
              Don't have an account?{' '}
              <Button color="primary" onClick={handleSignUpRedirect}>
                Sign Up
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginPage;
