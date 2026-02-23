import { Request, Response } from 'express';
import Stripe from 'stripe';
import Order from '../models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    const err = error as any;
    res.status(500).json({ error: err?.message || err });
  }
};

export const confirmPayment = async (req: Request, res: Response) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order status to paid
    order.status = 'paid';
    await order.save();

    res.status(200).json({ message: 'Payment confirmed', order });
  } catch (error) {
    const err = error as any;
    res.status(500).json({ error: err?.message || err });
  }
};