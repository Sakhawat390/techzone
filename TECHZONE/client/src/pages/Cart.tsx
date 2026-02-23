import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import Button from '../components/ui/Button';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    const handleRemove = (id: string) => {
        removeFromCart(id);
    };

    const handleClear = () => {
        clearCart();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-neon-green">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-neon-blue">Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item.id} className="flex justify-between items-center p-4 border border-neon-blue rounded-lg">
                                <div>
                                    <h2 className="text-xl text-neon-purple">{item.name}</h2>
                                    <p className="text-neon-pink">{formatCurrency(item.price)} x {item.quantity}</p>
                                </div>
                                <Button onClick={() => handleRemove(item.id)} className="bg-neon-red">Remove</Button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between">
                        <Button onClick={handleClear} className="bg-neon-yellow">Clear Cart</Button>
                        <h2 className="text-2xl text-neon-green">Total: {formatCurrency(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;