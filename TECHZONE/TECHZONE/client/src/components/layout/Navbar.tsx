import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    TECHZONE
                </Link>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-200">Home</Link>
                    <Link to="/products" className="text-white hover:text-gray-200">Products</Link>
                    <Link to="/cart" className="text-white hover:text-gray-200">Cart</Link>
                    <Link to="/account" className="text-white hover:text-gray-200">Account</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;