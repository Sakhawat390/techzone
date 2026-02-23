import { Request, Response } from 'express';
import Order from '../models/Order';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        const err = error as any;
        res.status(500).json({ message: err?.message || err });
    }
};

// Get an order by ID
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        const err = error as any;
        res.status(500).json({ message: err?.message || err });
    }
};

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        const err = error as any;
        res.status(500).json({ message: err?.message || err });
    }
};

// Get all orders for a specific user
export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ user: userId });
        res.status(200).json(orders);
    } catch (error) {
        const err = error as any;
        res.status(500).json({ message: err?.message || err });
    }
};

// Update an order
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        const err = error as any;
        res.status(500).json({ message: err?.message || err });
    }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        const err = error as any;
        res.status(500).json({ message: err?.message || err });
    }
};