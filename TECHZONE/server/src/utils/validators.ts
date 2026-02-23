import { body, validationResult } from 'express-validator';

export const validateUserRegistration = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    body('email')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

export const validateProductCreation = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required'),
    body('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .notEmpty()
        .withMessage('Price is required'),
    body('description')
        .notEmpty()
        .withMessage('Description is required'),
];

export const validateOrderPlacement = [
    body('userId')
        .notEmpty()
        .withMessage('User ID is required'),
    body('products')
        .isArray()
        .withMessage('Products must be an array')
        .notEmpty()
        .withMessage('Products are required'),
];

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};