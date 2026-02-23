# TECHZONE - E-Commerce Web Application

## Overview
TECHZONE is a full-stack e-commerce web application built using React.js, Tailwind CSS, Node.js, Express.js, and MongoDB. The application features a neon-themed futuristic design and provides comprehensive functionalities for product management, user authentication, and order processing.

## Features
- **User Authentication**: Secure login and registration for users.
- **Product Management**: Admin dashboard for adding, editing, and deleting products.
- **Shopping Cart**: Users can add products to their cart and proceed to checkout.
- **Order Processing**: Users can place orders and track their status.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Docker (optional, for containerization)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TECHZONE
   ```

2. **Setup the Backend**
   - Navigate to the server directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file based on `.env.example` and configure your MongoDB connection string.
   - Start the server:
     ```bash
     npm run dev
     ```

3. **Setup the Frontend**
   - Navigate to the client directory:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React application:
     ```bash
     npm start
     ```

### Docker Setup (Optional)
To run the application using Docker, you can use the provided `docker-compose.yml` file. Run the following command in the root directory:
```bash
docker-compose up
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Inspired by modern e-commerce platforms.
- Built with a focus on user experience and performance.