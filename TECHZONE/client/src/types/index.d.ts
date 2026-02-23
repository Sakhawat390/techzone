// This file contains TypeScript type definitions used throughout the application.

export interface User {
    id: string;
    username: string;
    email: string;
    password?: string; // Optional for security reasons
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Order {
    id: string;
    userId: string;
    products: Array<{ productId: string; quantity: number }>;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, email: string, password: string) => Promise<void>;
}