import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import MenuPage from './components/MenuPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/resturants/login';
import SignupPage from './components/resturants/signup';
import RestaurantMenu from './components/resturants/restaurantMenu';
import AddMenu from './components/resturants/addMenu';
import ViewMenu from './components/viewMenu';
import Orders from './components/resturants/orders';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/restaurantMenu" element={<RestaurantMenu />} />
          <Route path="/addMenu" element={<AddMenu />} />
          <Route path="/viewmenu/:id" element={<ViewMenu />} />
          <Route path="/orders" element={<Orders />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
