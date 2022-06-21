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

// rutas chequear orden

router.get('/profile-edit/id:', usersController.profileEdit);

router.get('/index',)  ; 

router.get('/login', usersController.login); 

router.post('/login', usersController.singIn); //duda

router.post('/profile', upload.single('foto_perfil'), usersController.profileEdit);

router.post('/logout', usersController.logout);

router.get('/register', usersController.create); //Muestra el form registro al usuario

router.post('/register', upload.single('foto_perfil'), usersController.store); //preguntar si estta bien

router.get('/:id', usersController.show);



//router.get('/profile-edit/id:', usersController.profileEdit); 

//router.get('/profile', usersController.profile); 











module.exports = router;