import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const restaurantId = localStorage.getItem('restaurantId');

  useEffect(() => {
    if (!restaurantId) {
      console.error('No restaurantId found in localStorage');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost/Campus-Eats/server/orders.php?restaurantId=${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  const handleOrderStatusChange = async (orderId, isChecked) => {
    const status = isChecked ? 'ready' : 'not ready';
  
    try {
      const response = await fetch('http://localhost/Campus-Eats/server/updateOrderStatus.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          orderStatus: status,  
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
  
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, order_ready: status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.action.hover,
  }));

  return (
    <Box
      sx={{
        padding: '20px',
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/cart.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      <Box display="flex" justifyContent="space-between" marginBottom="20px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/restaurantMenu')}
        >
          Back to Restaurant Menu
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Order ID</StyledTableCell>
                    <StyledTableCell>Customer Name</StyledTableCell>
                    <StyledTableCell>Contact Number</StyledTableCell>
                    <StyledTableCell>Items</StyledTableCell>
                    <StyledTableCell>Total Price</StyledTableCell>
                    <StyledTableCell>Order Date</StyledTableCell>
                    <StyledTableCell>Order Ready?</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => {
                      const items = JSON.parse(order.items);

                      return (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.customer_name}</TableCell>
                          <TableCell>{order.contact_number}</TableCell>
                          <TableCell>
                            <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
                              {items.map((item, index) => (
                                <li key={index}>
                                  <strong>{item.name}</strong> - {item.quantity} x Rs. {item.price}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell>Rs. {order.total_price}</TableCell>
                          <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                          <TableCell>
                            <Checkbox
                              checked={order.order_ready === 'ready'}
                              onChange={(e) =>
                                handleOrderStatusChange(order.id, e.target.checked)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No orders available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Orders;
