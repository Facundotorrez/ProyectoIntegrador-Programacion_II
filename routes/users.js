var express = require('express');
var router = express.Router();
const usersController = require ('../controllers/usersController');

let multer = require('multer');
let path = require('path');

//configurando multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/users'))//ahora usamos path
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
}) 

var upload = multer({ storage: storage})

/* GET users listing. */

router.get('/',)  ; 

router.get('/login', usersController.login); 

router.get('/register', usersController.create); //creo que hay que cambiar a create
//router.post('/store', upload.single('avatar'),usersController.store);

router.get('/profile-edit', usersController.profileEdit); 

router.get('/profile', usersController.profile); 

//ruta por post

router.post('/register', upload.single('foto'), usersController.store); //preguntar si estta bien

router.post('/login', usersController.singIn); //duda

router.post('/logout', usersController.logout);

module.exports = router;