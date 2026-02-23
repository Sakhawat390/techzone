import React from 'react';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
        description: string;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-xl text-white mt-2">{product.name}</h2>
            <p className="text-gray-400">{product.description}</p>
            <p className="text-lg text-green-400 mt-2">${product.price.toFixed(2)}</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;