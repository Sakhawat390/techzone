import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { formatCurrency } from '../utils/format';

const Checkout = () => {
    const { cart, clearCart } = useContext(AuthContext);
    const history = useHistory();

    const handleCheckout = async () => {
        // Logic for handling checkout process
        // This could include API calls to process payment and create an order

        // Clear the cart after successful checkout
        clearCart();
        history.push('/thank-you'); // Redirect to a thank you page or order confirmation
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <h1 className="text-4xl font-bold mb-6">Checkout</h1>
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Order Summary</h2>
                <ul className="mb-4">
                    {cart.map((item) => (
                        <li key={item.id} className="flex justify-between mb-2">
                            <span>{item.name}</span>
                            <span>{formatCurrency(item.price)}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(cart.reduce((total, item) => total + item.price, 0))}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
                >
                    Complete Purchase
                </button>
            </div>
        </div>
    );
};

export default Checkout;