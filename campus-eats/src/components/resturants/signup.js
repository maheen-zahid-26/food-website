import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [logo, setLogo] = useState(null); 
  const navigate = useNavigate(); 

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const formData = new FormData();
    formData.append('restaurantName', restaurantName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('logo', logo); 

    try {
      const response = await fetch('http://localhost/Campus-Eats/server/signup.php', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('Content-Type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text(); 
        throw new Error(text); 
      }

      if (response.ok) {
        alert(data.message || 'Signup successful!');
        console.log('Signup successful:', data);
        setRestaurantName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLogo(null);
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed!');
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup: ' + error.message);
    }
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
          RESTAURANT SIGN UP
        </Typography>

        <form onSubmit={handleSignUp}>
          <TextField
            label="Restaurant Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RestaurantIcon />
                </InputAdornment>
              ),
            }}
          />

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

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VerifiedUserIcon />
                </InputAdornment>
              ),
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            style={{ marginTop: '10px' }}
          />

          <Box textAlign="center" marginTop="20px">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Box>

          <Box textAlign="center" marginTop="10px">
            <Typography variant="body2">
              Already have an account?{' '}
              <Button color="primary" onClick={() => navigate('/login')}>
                Login
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default SignupPage;
