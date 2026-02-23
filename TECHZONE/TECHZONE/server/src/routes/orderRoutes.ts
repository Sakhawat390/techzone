import express from 'express';
import { createOrder, getOrderById, updateOrder, deleteOrder, getUserOrders } from '../controllers/orderController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Route to create a new order
router.post('/', protect, createOrder);

// Route to get a specific order by ID
router.get('/:id', protect, getOrderById);

// Route to update an existing order
router.put('/:id', protect, updateOrder);

// Route to delete an order
router.delete('/:id', protect, deleteOrder);

// Route to get all orders for a specific user
router.get('/user/:userId', protect, getUserOrders);

export default router;