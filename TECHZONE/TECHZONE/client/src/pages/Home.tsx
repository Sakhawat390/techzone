import React, { useEffect, useState } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { fetchProducts } from '../services/api';

const Home: React.FC = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };

        getProducts();
    }, []);

    return (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen p-5">
            <header className="text-center text-white mb-10">
                <h1 className="text-5xl font-bold">Welcome to TECHZONE</h1>
                <p className="mt-2 text-lg">Your one-stop shop for the latest tech gadgets!</p>
            </header>
            <ProductGrid products={products} />
        </div>
    );
};

export default Home;