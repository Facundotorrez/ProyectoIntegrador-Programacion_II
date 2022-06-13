var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.index );

router.get('/product-add', productsController.productAdd);

//rutas que faltan de post

router.post('product-add', upload.single('imagen'), productsController.store); //ruta que guarda datos.

module.exports = router;