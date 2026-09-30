# Elyon Luxury E-Commerce

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.0-brightgreen.svg)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)
![React](https://img.shields.io/badge/React-Frontend-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)

Elyon is a modern, high-end, minimalistic e-commerce platform built on the MERN stack (MongoDB, Express, React, Node.js). It offers a sleek shopping experience tailored for premium skincare and bodycare brands, providing robust functionality for both customers and administrators.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Environment Variables](#1-environment-variables)
  - [2. Installation](#2-installation)
  - [3. Service Account Key](#3-service-account-key)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [API Endpoints Overview](#api-endpoints-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Minimalist Aesthetic:** Clean, high-end UI designed with modern best practices, focusing on usability and elegance.
- **Firebase Authentication:** Secure, robust user sign-up and login utilizing Firebase Auth and JWT for session management.
- **Real-time Updates:** Socket.io integration provides live order status notifications so customers always know where their purchases are.
- **Email Notifications:** Automated emails for order confirmation, successful payment, and shipping notifications sent via Nodemailer.
- **Advanced Search & Filtering:** Dynamic sidebar allowing users to filter products seamlessly by category, rating, and price range.
- **Wishlist System:** Users can easily favorite products for later purchase.
- **Full-featured Shopping Cart:** LocalStorage-persisted cart allowing guests and users to add, update, or remove items.
- **Admin Dashboard:** Comprehensive management portal for admins to handle products (CRUD), manage users, oversee orders, and view live sales analytics.
- **Payment Integration:** Secure checkout process supporting live PayPal integration.
- **Responsive Design:** Mobile-first approach ensuring the app looks beautiful on desktops, tablets, and mobile devices.

---

## Tech Stack

### Frontend
- **React.js:** Functional components & hooks.
- **Redux Toolkit:** State management (including `createApi` for API calls).
- **React Bootstrap:** Component library for responsive layout and styling.
- **React Router DOM:** Client-side routing.
- **Socket.io-client:** Real-time web socket connections.

### Backend
- **Node.js & Express.js:** RESTful API architecture.
- **MongoDB & Mongoose:** NoSQL database and object data modeling.
- **Firebase Admin:** Backend validation of Firebase authentication.
- **JWT (JSON Web Tokens):** Authorization logic.
- **Socket.io:** Emitting real-time updates to connected clients.
- **Nodemailer:** Sending transactional emails.
- **Multer:** Handling image uploads.

---

## Prerequisites

Before running the project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- A [Firebase](https://firebase.google.com/) Project (for Auth & Admin SDK)
- A [PayPal Developer](https://developer.paypal.com/) Account (for payment processing)

---

## Getting Started

### 1. Environment Variables

Create a `.env` file in the **root** directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

Create a `.env` file in the **`frontend`** directory for Firebase:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 2. Installation

Install all backend and frontend dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Service Account Key

To use Firebase Admin on the backend, you must generate a private key.
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Project Settings > Service Accounts**.
3. Click **Generate new private key** and download the JSON file.
4. Rename it to `serviceAccountKey.json` and place it inside the `backend/` directory.

*(Note: Ensure `serviceAccountKey.json` is added to your `.gitignore` to prevent exposing your credentials).*

---

## Available Scripts

In the root directory, you can run the following commands:

- `npm run dev`: Runs both the frontend and backend concurrently in development mode.
- `npm run server`: Runs only the backend server using Nodemon.
- `npm run client`: Runs only the React frontend.
- `npm run data:import`: Seeds the MongoDB database with sample users and products. (Warning: This will clear existing data).
- `npm run data:destroy`: Drops all users, products, and orders from the database.
- `npm run build`: Installs all dependencies and builds the frontend for production.

---

## Project Structure

```text
elyon/
├── backend/
│   ├── config/         # Database and Firebase configurations
│   ├── controllers/    # Route logic and request handling
│   ├── data/           # Sample seed data
│   ├── middleware/     # Custom error, auth, and async middlewares
│   ├── models/         # Mongoose schemas (User, Product, Order)
│   ├── routes/         # Express API routes
│   ├── utils/          # Helper functions (JWT, Pricing, PayPal, Email)
│   ├── seeder.js       # Script to populate/clear DB
│   └── server.js       # Entry point for backend
├── frontend/
│   ├── public/         # Static assets and index.html
│   ├── src/
│   │   ├── assets/     # Images, custom CSS
│   │   ├── components/ # Reusable UI components
│   │   ├── screens/    # Page-level components
│   │   ├── slices/     # Redux RTK Query slices for state and APIs
│   │   ├── store.js    # Redux store configuration
│   │   └── App.js      # Main application router
│   └── package.json    # React app dependencies
├── uploads/            # Local directory for user-uploaded product images
├── .env                # Root environment variables
└── package.json        # Root dependencies and scripts
```

---

## API Endpoints Overview

Here is a brief overview of the primary REST API endpoints available in the backend:

**Users (`/api/users`)**
- `POST /api/users/login` - Authenticate user & get token
- `POST /api/users` - Register a new user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin)

**Products (`/api/products`)**
- `GET /api/products` - Fetch all products (supports search and pagination)
- `GET /api/products/:id` - Fetch single product
- `POST /api/products` - Create a product (Admin)
- `PUT /api/products/:id` - Update a product (Admin)
- `DELETE /api/products/:id` - Delete a product (Admin)
- `POST /api/products/:id/reviews` - Create a new review

**Orders (`/api/orders`)**
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)
- `GET /api/orders/mine` - Get logged in user orders
- `GET /api/orders` - Get all orders (Admin)

---

## Contributing

Contributions are always welcome! If you'd like to improve the project:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ for Elyon E-Commerce*
