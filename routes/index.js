var express = require('express'); // define el sistema de ruteo
var router = express.Router(); //nos permite modularizar todo el sistema
const indexController = require('../controllers/indexController'); //se requiere los controladores de cada uno de los archivos para trabajar con ellos

/* GET home page. */
router.get('/', indexController.index);

router.get('/search-results', indexController.searchResults);

module.exports = router; 