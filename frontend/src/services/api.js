import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        console.log('API login response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/auth/request-password-reset`, { email });
        return response.data;
    } catch (error) {
        console.error('Error during password reset request:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const resetPassword = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password`, data);
        return response.data;
    } catch (error) {
        console.error('Error during password reset:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getProfile = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during fetching profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/products/add`, productData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during adding product:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error during fetching products:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getUserProducts = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/products/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during fetching user products:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${API_URL}/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during deleting product:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteAccount = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(`${API_URL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during deleting account:', error.response ? error.response.data : error.message);
        throw error;
    }
};