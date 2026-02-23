import * as expressValidator from 'express-validator';
import { Request, Response, NextFunction } from 'express';
export const validateUserRegistration = [
    expressValidator.body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    expressValidator.body('email')
        .isEmail()
        .withMessage('Invalid email format'),
    expressValidator.body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

export const validateProductCreation = [
    expressValidator.body('name')
        .notEmpty()
        .withMessage('Product name is required'),
    expressValidator.body('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .notEmpty()
        .withMessage('Price is required'),
    expressValidator.body('description')
        .notEmpty()
        .withMessage('Description is required'),
];

export const validateOrderPlacement = [
    expressValidator.body('userId')
        .notEmpty()
        .withMessage('User ID is required'),
    expressValidator.body('products')
        .isArray()
        .withMessage('Products must be an array')
        .notEmpty()
        .withMessage('Products are required'),
];

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};