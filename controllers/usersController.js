const data = require('../db/data');
const db = require('../database/models');
const bcrypt = require('bcryptjs'); //preguntar a ale xq no me llama
const productos = db.Producto
const comentarios = db.Comentario
const users = db.Usuario;
const seguidores = db.Seguidor;

//multer 
const multer = require('multer');
const path = require('path');
const { dirname } = require('path');
const { usuarios } = require('../db/data');


const usersController = {

    login: function (req, res){
        return res.render('login');
    },

    login : function (req,res){ // chequear que un usuario este logeado
        
        if(req.session.user  != undefined){
            return res.redirect('/index')
        } else {
            return res.render('login');
        }
    },

    create : function (req,res){
       return res.render('register');
    },

    profileEdit : function (req,res){
        return res.render('profile-edit');
    },

   show: function (req,res){
    let data = {
        users: null,
        productos: null,
        comentarios: null
    };
    users.findOne({
        where: [{id: req.params.id}]
    })
    .then(function(users){
        comentarios.findAll({
            where: [{FkUsersId: req.params.id}]
        })
        .then(function (comentarios){
            productos.findAll({
                where: [{FkUsersId: req.params.id}]
            })
            .then(function(productos){
                seguidores.findAll({
                    where: [{FkUsersId: req.params.id}]
                })
                .then(function(seguidores){
                    seguidores.findOne({
                        where: [
                            {FkUsersId: req.params.id},
                            {FkSeguidorId: res.locals.user.id}
                        ]
                    })
                })
            })
        })
    })
   },

    singIn: function(req,res){
        let errors = {};        
       //aclaro que los campos no pueden ir incompletos
        if(!req.body.email && !req.body.password){
            errors.message = 'No puede haber campos vacios';
            res.locals.errors = errors;
            return res.render('login');
        } else {
            users.findOne({
                where: [{ 
                    email: req.body.email
                }]
            })
            .then(function(user){ //si no me anduvo  
                if(user != null ){
                    if(bcrypt.compareSync(req.body.password, user.contraseña)){
                         req.session.user = user.dataValues;
                        if(req.body.remember){
                            res.cookie('userId', user.id, {
                                maxAge: 1000 * 60 * 5
                            });
                        }
                        console.log(req.session.user);
                        res.locals.user = user
                        console.log(res.locals.user);
                        res.redirect('/index');
                    } else { //si no se acuerda de la contraseña manda que hay un error
                    errors.message = 'El mail o contraseña son incorrectos'
                    res.locals.errors = errors;
                    return res.render('login');
                    }
            }  else { //si no se acuerda de la contraseña manda que hay un error
                errors.message = 'El mail o contraseña son incorrectos'
                res.locals.errors = errors;
                return res.render('login');
            }})
                .catch(error => console.log(error))
        } 
    },
        

    store : function (req,res){ //preguntar como encriptar
        let errors = {};
        // || significa or, simplifique el codigo y directamente estableci que no pueden ir con campo vacio las secciones de usuario/clave/mail/fechadenacimiento/fotodeperfil
        if(!req.body.nombre_usuario && !req.body.email && !req.body.fecha && !req.body.foto_perfil){
            errors.message = 'No puede haber campos incompletos.';
            res.locals.errors = errors;
            return res.render('register');
        } else if(req.body.password.length <3){ //que la clave no tenga menos de 3 carcateres
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
                  //  return res.send(req.body)
                  let user = {
                    email: req.body.email,
                    nombre_usuario: req.body.usuario,
                    contraseña: bcrypt.hashSync(req.body.password, 10),
                    foto_perfil: req.file.filename,
                    fecha: req.body.fecha
                  }  
                  users.create(user)
                  .then(function(user){   //preguntar a ale xq no me toma la variable
                    return res.redirect('/index')
                  })            
                  .catch( error => console.log(error))      
                }
            })
            .catch( error => console.log(error))
        }
    },     


    editar: function(req, res){
        let errors = {}
        //hago formulario como el de register
        if(req.body.email == null){
            errors.message = 'Llenar campo de email';
            res.locals.errors = errors;
            return res.reder('profile-edit');
        } else if (req.body.nombre_usuario == null){
            errors.message = 'Completar campo con nombre de Usuario';
            res.locals.errors = errors;
            return res.render('profile-edit');
        } else if (req.file.filename == null){
            errors.message = 'Completar campo con una imagen';
            res.locals.errors = errors;
            return res.render('profile-edit');
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
                  //  return res.send(req.body)
                  let user = {
                    email: req.body.email,
                    nombre_usuario: req.body.usuario,
                    contraseña: bcrypt.hashSync(req.body.password, 10),
                    foto_perfil: req.file.filename,
                    fecha: req.body.fecha
                  }  
                
                  users.update(user, {where: {id: req.session.user.id}})
                  .then(function (userEditado){
                    return res.redirect('profile' + req.session.user.id)
                  })
                  .catch( error => console.log(error))
                }
            })
            .catch( error => console.log(error))
        }
    },

    logout: function(req,res){  //chequear, es el logout
        req.session.destroy();
        if(req.cookies.userId !== undefined){
            res.clearCookie('userId')
        }
        return res.redirect('/');
    },

  seguir: function(req,res){

        if (!req.session.user){
            res.redirect('/users/'+req.params.id);
        }

        db.Seguidor.create({
            seguidor_id: req.session.user.id,
            Seguido_id: req.params.id
        }).then(seguidor =>{
            res.redirect('/users/'+req.params.id);
        }).catch(error =>{
            return res.send(error);
        })
    },
    noseguir: function(req,res){
        if(!req.session.user){
            res.redirect('/users/'+req.params.id);
        }
    }, 

}

module.exports = usersController;

//cada controlador renderiza las vistas que se requieren en cada caso.