const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/website/order.controller');


router.post('/', orderController.index);
router.post('/thanh-toan', orderController.pay);

module.exports = router;