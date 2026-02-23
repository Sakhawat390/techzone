import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

// Function to register a new user
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

// Function to log in a user
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

// Function to fetch all products
export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

// Function to fetch a single product by ID
export const fetchProductById = async (productId) => {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
};

// Function to add a product to the cart
export const addToCart = async (productId, quantity) => {
    const response = await axios.post(`${API_URL}/cart`, { productId, quantity });
    return response.data;
};

// Function to place an order
export const placeOrder = async (orderData) => {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
};