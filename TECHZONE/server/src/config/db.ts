import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        const err = error as any;
        console.error('MongoDB connection failed:', err?.message || err);
        process.exit(1);
    }
};

export default connectDB;