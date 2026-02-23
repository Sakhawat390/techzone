import express from 'express';
import { json } from 'body-parser';
import { authRoutes } from './routes/auth';
import { productRoutes } from './routes/product';
import { orderRoutes } from './routes/order';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});