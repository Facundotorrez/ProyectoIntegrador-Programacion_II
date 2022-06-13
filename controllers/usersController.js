const data = require('../db/data');
const db = require('../database/models');
const bcrypt = require('bcryptjs'); //preguntar a ale xq no me llama
const usuario = require('../database/models/usuario');

const users = db.Usuario;

const usersController = {
    login : function (req,res){ // chequear que un usuario este logeado
        if(req.session.user != undefined){
            return res.redirect('/')
        } else {
            return res.render('login');
        }
    },

    register : function (req,res){
        res.render('register')
    },

    profileEdit : function (req,res){
        res.render('profile-edit',{usuario:data.usuarios});
        
    },

    profile : function (req,res){
        res.render('profile', {usuario:data.usuarios, libros:data.libros });
    },

    singIn: function(req,res){
        //aclaro que los campos no pueden ir incompletos
        if(!req.body.email || !req.body.password){
            errors.message = 'No puede haber campos vacios';
            res.locals.errors = errors;
            return res.render('login');
        } else {
            users.findOne({
                where: [{ 
                    email: req.body.email
                }]
            })
            .then(function(user){ //Me fijo que el mail y la contraeña del usuario existn.(&& significan and(y))
                if(user && bcrypt.compareSync(req.body.password, user.password)){
                    req.session.user = user.dataValues;
                    if(req.body.remember){
                        res.cookie('userId', user.id, {
                            maxAge: 1000 * 60 * 5
                        });
                    }
                    console.log(req.session.user);
                    res.redirect('/');
                } else { //si no se acuerda de la contraseña manda que hay un error
                    errors.message = 'El mail o contraseña son incorrectos'
                    res.locals.errors = errors;
                    return res.render('login');
                }
            })
                .catch(error => console.log(error))
        }
    },
        

    store : function (req,res){ //preguntar como encriptar
        let errors = {}
        // || significa or, simplifique el codigo y directamente estableci que no pueden ir con campo vacio las secciones de usuario/clave/mail/fechadenacimiento/fotodeperfil
        if(!req.body.usuario || !req.body.email || !req.body.birthdate || !req.body.foto){
            errors.message = 'No puede haber campos vacios';
            res.locals.errors = errors;
            return res.render('register');
        } else if(req.body, password.length <3){ //que la clave no tenga menos de 3 carcateres
            errors.message = 'La contraseña debe tener mas de 3 caracteres';
            res.locals.errors = errors;
            return res.render('register');
        } else {
            //fijarse que el mail no exista en la base
            users.findOne({
                where: [{email: req.body.email}]
            })
            .then( function(user){
                if(user !== null){
                    errors.message = 'El email ya existe, elija otro';
                    res.locals.errors = errors;
                    return res.render('register');
                }else{
                  let user = {
                    email: req.body.email,
                    usuario: 'Juancito',
                    password: bcrypt.hashSync(req.body.password, 10),
                    foto: req.file.filename
                  }  
                  users.create(user)
                  .then(function(user){   //preguntar a ale xq no me toma la variable
                    return res.redirect('/')
                  })            
                  .catch( error => console.log(error))      
                }
            })
            .catch( error => console.log(error))
        }
    },     

    logout: function(req, res){  //chequear, es el logout
        req.session.destroy();
        if(req.cookies.userId !== undefined){
            res.clearCookie('userId')
        }
        return res.redirect('/');
    }

}

module.exports = usersController;

//cada controlador renderiza las vistas que se requieren en cada caso.