import express from 'express';
import { json } from 'body-parser';
import { authRoutes } from './routes/auth';
import { productRoutes } from './routes/product';
import { orderRoutes } from './routes/order';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;