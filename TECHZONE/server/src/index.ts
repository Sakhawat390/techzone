import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.DATABASE_URL || process.env.MONGODB_URI || '';

// Start the server regardless of DB connection so frontend/dev work can proceed.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.connect(MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});