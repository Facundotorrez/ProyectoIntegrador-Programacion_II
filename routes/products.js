var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController');

//establecemos multer xq vamos a utilizar fotos. Se establece en rutas y controllers y ejs 
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'));
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

//rutas
router.get('/index', productsController.index);

router.get('/product-add', productsController.productAdd);

router.post('/store', upload.single('foto'), productsController.store); //ruta que guarda datos.

router.post('/comentarios', productsController.storeComentarios); //comments

router.get('/id', productsController.show); //va a mostrar el form de carga.

router.get('edit/:id', productsController.editar);

router.post('/update/:id', uplad.single('foto'), productsController.update); // completar en el controlador




module.exports = router;