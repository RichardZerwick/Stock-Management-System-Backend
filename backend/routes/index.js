const express = require('express');

const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const productsRoutes = require('./products');

const router = express.Router();

router.use('/auth', authRoutes);
//router.use('/admin', adminRoutes);
//router.use('/users', userRoutes);
//router.use('/products', productsRoutes);

module.exports = router;
