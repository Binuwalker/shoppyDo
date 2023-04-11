import React from "react";
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import TopNav from "./components/header/TopNav";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Cart from "./components/pages/Cart";
import Error from "./components/error/Error";
import ProductDetails from "./components/pages/ProductDetails";
import ShippingInfo from "./components/pages/ShippingInfo";
import ConfirmOrder from "./components/pages/ConfirmOrder";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import Address from "./components/pages/Address";

function App() {
  return (
    <div className="app">
      <Router>
        <TopNav />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/user/:id' element={<Profile />} />
          <Route path='/home' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path='/shippinginfo' element={<ShippingInfo />} />
          <Route path='/confirmorder' element={<ConfirmOrder />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
