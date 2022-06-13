var express = require('express');
var router = express.Router();
const usersController = require ('../controllers/usersController');
/* GET users listing. */

router.get('/',)  ; 

router.get('/login', usersController.login); 

router.get('/register', usersController.register); //creo que hay que cambiar a create
//router.post('/store', upload.single('avatar'),usersController.store);

router.get('/profile-edit', usersController.profileEdit); 

router.get('/profile', usersController.profile); 

//ruta por post
router.get('/register', usersController.store);

router.post('/login', usersController.singIn); //duda

router.post('/logout', usersController.logout);

module.exports = router;