var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController'); //se requiere los controladores de cada uno de los archivos para trabajar con ellos

/* GET home page. */
router.get('/', indexController.index); //DUDA: va con comilla francesas ¿si o no?

router.get('/search-results', indexController.searchResults);

module.exports = router;