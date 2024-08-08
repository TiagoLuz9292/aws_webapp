import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../services/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setProducts(products);
            } catch (err) {
                setError(err.response ? err.response.data : 'An error occurred');
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter(product => product._id !== productId));
        } catch (err) {
            setError(err.response ? err.response.data : 'An error occurred');
        }
    };

    return (
        <div className="container mt-5">
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {products.map(product => (
                    <div key={product._id} className="col-md-4">
                        <div className="card mb-4">
                            <img src={`http://localhost:3001${product.imageUrl}`} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">${product.price.toFixed(2)}</p>
                                <p className="card-text">Added by: {product.user ? product.user.username : 'Unknown'}</p>
                                {localStorage.getItem('userId') === product.user._id && (
                                    <button onClick={() => handleDelete(product._id)} className="btn btn-danger">Delete</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
