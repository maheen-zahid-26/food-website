  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import Grid from '@mui/material/Grid';
  import Paper from '@mui/material/Paper';
  import Button from '@mui/material/Button';
  import AddCircleIcon from '@mui/icons-material/AddCircle';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';  
  import TextField from '@mui/material/TextField';
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogTitle from '@mui/material/DialogTitle';

  function RestaurantMenu() {
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [newPrice, setNewPrice] = useState('');
    const [itemToUpdate, setItemToUpdate] = useState(null);
    const restaurantId = localStorage.getItem('restaurantId'); 

    const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

    useEffect(() => {
      if (!restaurantId) {
        console.error('No restaurantId found in localStorage');
        return;
      }

      const fetchMenuItems = async () => {
        try {
          const response = await fetch(`http://localhost/Campus-Eats/server/menu.php?restaurantId=${restaurantId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch menu items');
          }
          const data = await response.json();
          setMenuItems(data);
        } catch (error) {
          console.error('Error fetching menu:', error);
        }
      };

      fetchMenuItems();
    }, [restaurantId]);

    const handleClickOpen = (item) => {
      setItemToUpdate(item);
      setNewPrice(item.price);  
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleUpdatePrice = async () => {
      if (!newPrice || isNaN(newPrice) || newPrice <= 0) {
        alert('Invalid price');
        return;
      }

      try {
        const response = await fetch(`http://localhost/Campus-Eats/server/updatePrice.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemId: itemToUpdate.id,
            newPrice,
          }),
        });
        const data = await response.json();

        if (data.status === 'success') {
          setMenuItems(menuItems.map(item => 
            item.id === itemToUpdate.id ? { ...item, price: newPrice } : item
          ));
          setOpen(false);
        } else {
          alert('Failed to update price');
        }
      } catch (error) {
        console.error('Error updating price:', error);
        alert('Error updating price');
      }
    };

    const handleDeleteItem = async (itemId) => {
      if (window.confirm('Are you sure you want to delete this menu item?')) {
        try {
          const response = await fetch('http://localhost/Campus-Eats/server/deleteMenu.php', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId }),
          });
          const data = await response.json();
    
          if (data.status === 'success') {
            setMenuItems(menuItems.filter(item => item.id !== itemId));
          } else {
            alert('Failed to delete item');
          }
        } catch (error) {
          console.error('Error deleting item:', error);
          alert('Error deleting item');
        }
      }
    };

   
    const groupedItems = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    return (
      <Box
        sx={{
          padding: '20px',
          minHeight: '100vh',
          backgroundImage:`url(${process.env.PUBLIC_URL}/menupage.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Menu
        </Typography>

        <Box display="flex" justifyContent="space-between" marginBottom="20px">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate(`/addMenu`)} 
          >
            Add Menu Item
          </Button>
          
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate('/deals')}
          >
            Add Deals
          </Button>

        
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/orders')}
          >
            Orders
          </Button>

        </Box>

        

        <Grid container spacing={3}>
          {categories.map((category) => {
            const itemsInCategory = groupedItems[category];
            if (!itemsInCategory || itemsInCategory.length === 0) return null;

            return (
              <Grid item xs={12} key={category}>
                <Typography variant="h5" gutterBottom>{category}</Typography>
                <Grid container spacing={3}>
                  {itemsInCategory.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Paper elevation={3} sx={{ padding: '15px', textAlign: 'center' }}>
                        <img 
                          src={`http://localhost/Campus-Eats/server/${item.image_path}`} 
                          alt={item.name} 
                          style={{ 
                            width: '100%', 
                            height: '200px', 
                            objectFit: 'cover',  
                            marginBottom: '10px' 
                          }}  
                        />
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body1" color="textSecondary">
                          {item.description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          Rs.{item.price}
                        </Typography>
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <Button
                            startIcon={<EditIcon />}
                            onClick={() => handleClickOpen(item)}
                            sx={{ marginTop: '10px' }}
                          >
                            Edit
                          </Button>
                          <Button
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteItem(item.id)}
                            sx={{
                              marginTop: '10px', 
                              color: 'red', 
                              '&:hover': {
                                backgroundColor: 'red', 
                                color: 'white', 
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        {menuItems.length === 0 && (
          <Typography variant="body1" color="textSecondary" textAlign="center" marginTop="20px">
            No menu items available.
          </Typography>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Price</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="New Price"
              type="number"
              fullWidth
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdatePrice} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  export default RestaurantMenu;
