import React, { useEffect, useState } from 'react';
import { getProducts, getOrders } from '../services/api';
import ProductCard from '../components/product/ProductCard';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const productsData = await getProducts();
            const ordersData = await getOrders();
            setProducts(productsData);
            setOrders(ordersData);
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-8">
            <h1 className="text-4xl text-white font-bold mb-6">Admin Dashboard</h1>
            <div className="mb-8">
                <h2 className="text-2xl text-white">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-2xl text-white">Orders</h2>
                <ul className="bg-white rounded-lg shadow-lg p-4">
                    {orders.map(order => (
                        <li key={order._id} className="border-b py-2">
                            Order ID: {order._id} - Status: {order.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;