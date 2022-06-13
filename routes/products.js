var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.index);

router.get('/product-add', productsController.productAdd);

//router.get('/product-add'), productsController.post);

module.exports = router;