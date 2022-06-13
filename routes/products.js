var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.index);

router.get('/product-add', productsController.productAdd);

//router.get('/product-add'), productsController.post);

//rutas que faltan de post

router.post('product-add', productsController.store); //ruta que guarda datos.

module.exports = router;