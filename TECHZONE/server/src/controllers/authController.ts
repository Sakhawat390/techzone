import { Request, Response } from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await (UserModel as any).create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        const err = error as any;
        res.status(500).json({ message: 'Error registering user', error: err?.message || err });
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await (UserModel as any).findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        const err = error as any;
        res.status(500).json({ message: 'Error logging in', error: err?.message || err });
    }
};

export { register, login };