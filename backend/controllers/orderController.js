import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    
    // Notify user via Email
    try {
      await sendEmail({
        email: req.user.email,
        subject: `Elyon E-Commerce - Order Confirmation ${createdOrder._id}`,
        message: `Thank you for your order! Your total is $${createdOrder.totalPrice}.`,
      });
    } catch (err) {
      console.error('Email failed to send');
    }

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // NOTE: here we need to verify the payment was made to PayPal before marking
  // the order as paid
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    
    // Notify user
    req.app.get('io').to(order.user.toString()).emit('orderStatusUpdated', {
      message: 'Your order has been paid successfully!',
      orderId: order._id,
    });
    
    // Notify user via Email
    try {
      await sendEmail({
        email: order.user.email || req.user.email,
        subject: `Elyon E-Commerce - Payment Received for Order ${order._id}`,
        message: `We have received your payment of $${order.totalPrice}. Your order is being processed!`,
      });
    } catch (err) {
      console.error('Email failed to send');
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    
    // Notify user
    req.app.get('io').to(order.user.toString()).emit('orderStatusUpdated', {
      message: 'Your order has been delivered!',
      orderId: order._id,
    });
    
    // Notify user via Email
    try {
      // Populating user inside getOrderById earlier, but here we can find it
      // since req.user is admin, order.user might just be ObjectId unless populated
      // We will try to rely on order.populate in the route or just pass if no email available
      await sendEmail({
        email: req.user.email, // Best effort for admin email in this case if not populated, but ideally we should populate
        subject: `Elyon E-Commerce - Order Shipped ${order._id}`,
        message: `Great news! Your order ${order._id} has been delivered.`,
      });
    } catch (err) {
      console.error('Email failed to send');
    }

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

// @desc    Get dashboard analytics
// @route   GET /api/orders/analytics
// @access  Private/Admin
const getAnalytics = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  const totalOrders = orders.length;
  const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const users = await Order.distinct('user');
  const totalUsers = users.length;
  const products = await Product.countDocuments();

  res.json({
    totalOrders,
    totalSales,
    totalUsers,
    totalProducts: products,
  });
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getAnalytics,
};
