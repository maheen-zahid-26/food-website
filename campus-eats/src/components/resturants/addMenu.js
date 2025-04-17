import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CancelIcon from '@mui/icons-material/Cancel'; 
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function AddMenu() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  
  const restaurantId = localStorage.getItem('restaurantId');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddMenu = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('restaurantId', restaurantId);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('category', category);

      const response = await fetch(`http://localhost/Campus-Eats/server/addMenu.php`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Menu item added successfully!');
        navigate('/restaurantMenu'); 
      } else {
        alert(data.message || 'Failed to add menu item!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the menu item.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '110vh',
        backgroundImage:`url(${process.env.PUBLIC_URL}/menu.jpg)`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          width: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Add Menu Item
        </Typography>

        <form onSubmit={handleAddMenu} encType="multipart/form-data">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            required
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="Appetizer">Appetizer</MenuItem>
              <MenuItem value="Main Course">Main Course</MenuItem>
              <MenuItem value="Dessert">Dessert</MenuItem>
              <MenuItem value="Beverage">Beverage</MenuItem>
            </Select>
          </FormControl>
          
          <Box textAlign="center" marginTop="20px">
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ marginBottom: '10px' }}
              startIcon={<AddPhotoAlternateIcon />} 
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {image && <Typography variant="body2">{image.name}</Typography>}
          </Box>
          <Box textAlign="center" marginTop="20px">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddIcon />} 
            >
              Add Menu Item
            </Button>
          </Box>
          <Box textAlign="center" marginTop="10px">
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate('/restaurantMenu')}
              startIcon={<CancelIcon />} 
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default AddMenu;
