const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/authMiddleware');
const { 
  createOrder, 
  getMyOrders, 
  getOrderById, 
  getAllOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');

// Customer Routes
router.post('/', verifyAuth, createOrder);
router.get('/', verifyAuth, getMyOrders);
router.get('/:id', verifyAuth, getOrderById);

// Admin Routes
router.get('/admin/all', verifyAuth, getAllOrders);
router.patch('/admin/status/:id', verifyAuth, updateOrderStatus);

module.exports = router;