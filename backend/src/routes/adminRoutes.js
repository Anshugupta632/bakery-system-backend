const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/adminMiddleware');
const { getAllCakesAdmin, updateCakePrice, toggleCakeStock } = require('../controllers/adminController');

router.use(verifyAdmin); // saare admin routes protected hain

router.get('/cakes', getAllCakesAdmin);
router.put('/cakes/:id/price', updateCakePrice);
router.put('/cakes/:id/stock', toggleCakeStock);

module.exports = router;