import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        toast.success('Logout successful', {
            position: "top-right",
            autoClose: 3000,
        });
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Online Marketplace</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Product List</Link>
                        </li>
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-product">Add Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/my-products">My Products</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="ms-auto">
                        {isLoggedIn ? (
                            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <Link className="btn btn-outline-primary me-2" to="/register">Register</Link>
                                <Link className="btn btn-outline-primary" to="/login">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
