import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import RequestPasswordReset from './components/Auth/RequestPasswordReset';
import ResetPassword from './components/Auth/ResetPassword';
import Profile from './components/Profile';
import AddProduct from './components/Products/AddProduct';
import ProductList from './components/Products/ProductList';
import MyProducts from './components/Products/MyProducts';
import './App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/request-password-reset" element={<RequestPasswordReset />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/my-products" element={<MyProducts />} />
            </Routes>
        </Router>
    );
};

export default App;
