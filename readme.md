# Elyon Luxury E-Commerce

Elyon is a modern, high-end, minimalistic e-commerce platform built on the MERN stack (MongoDB, Express, React, Node.js). It offers a sleek shopping experience tailored for premium skincare and bodycare brands.

## Features

- **Minimalist Aesthetic:** Clean, black-and-white UI with an elegant Inter font.
- **Firebase Authentication:** Secure, robust user sign-up and login.
- **Real-time Updates:** Socket.io integration provides live order status notifications.
- **Email Notifications:** Automated emails for order confirmation, payment, and shipping via Nodemailer.
- **Advanced Search & Filtering:** Dynamic sidebar to filter products by category, rating, and price.
- **Wishlist System:** Users can easily favorite products.
- **Admin Dashboard:** Full management portal for handling products, users, orders, and viewing live sales analytics.
- **Payment Integration:** Live PayPal checkout support.

## Tech Stack

- **Frontend:** React, Redux Toolkit, React Bootstrap
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Real-time:** Socket.io
- **Auth:** Firebase Auth + JWT

## Getting Started

### 1. Environment Variables

Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

Create a `.env` file in the `frontend` directory for Firebase:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 2. Install Dependencies

Install root backend and frontend dependencies:
```bash
npm install
cd frontend && npm install
```

### 3. Service Account Key

To use Firebase Admin on the backend, download your `serviceAccountKey.json` from the Firebase Console and place it in the `backend/` directory.

### 4. Run the Application

```bash
# Run both client and server concurrently
npm run dev
```

### 5. Seed the Database
You can seed the database with sample products and the default Admin account by running:
```bash
npm run data:import
```

---
*Built with ❤️ for Elyon E-Commerce*
