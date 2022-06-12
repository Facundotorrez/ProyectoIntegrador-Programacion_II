var express = require('express');
var router = express.Router();
const usersController = require ('../controllers/usersController');
/* GET users listing. */

router.get('/',)  ; 

router.get('/login', usersController.login); 

router.get('/register', usersController.register); 

router.get('/profile-edit', usersController.profileEdit); 

router.get('/profile', usersController.profile); 

// establecer rutas en post para guardar informacion de formularios
router.get('/login', usersController.store); 

router.post('/register', usersController.store); 

router.get('/profile-edit', usersController.store); 

router.get('/profile', usersController.store); 

module.exports = router;