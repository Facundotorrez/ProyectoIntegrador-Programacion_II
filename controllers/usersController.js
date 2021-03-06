const data = require('../db/data');
const db = require('../database/models');
const bcrypt = require('bcryptjs'); //preguntar a ale xq no me llama
const productos = db.Producto
const comentarios = db.Comentario
const users = db.Usuario
const seguidores = db.Seguidor

//multer 
const multer = require('multer');
const path = require('path');
const { dirname } = require('path');



const usersController = {

    usuario: function (req, res) {

        let userId = req.params.id

        users.findByPk(userId, {
            include: [
                { association: 'Producto' },
                { association:'Comentario' },
                { association:'Seguidor' },
            ]
        })
        .then(data => {

            let seguido = false 

            for (let i=0; i<data.Seguidor.length; i++ )
            {
                
               if(req.session.user.id == data.Seguidor[i].id){
                    seguido = true 
                }
            }

            return res.render('profile', { data: data, seguido: seguido })
            })

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
    
    profileEdit: function (req, res) {
        if(req.session.user == undefined){
            return res.redirect('/')
    }
    },
    

   show: function (req,res){
    let data = {
        usuarios: null,
        productos: null,
        comentarios: null
    };
    users.findOne({
        where: [{id: req.params.id}]
    })
    .then(function(usuarios){
        usuarios.findAll({
            where: [{FkUsersId: req.params.id}]
        })
        .then(function (comentarios){
            comentarios.findAll({
                where: [{FkUsersId: req.params.id}]
            })
            .then(function(productos){
                productos.findAll({
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
                    if(bcrypt.compareSync(req.body.password, user.contrase??a)){
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
                    } else { //si no se acuerda de la contrase??a manda que hay un error
                    errors.message = 'El mail o contrase??a son incorrectos'
                    res.locals.errors = errors;
                    return res.render('login');
                    }
            }  else { //si no se acuerda de la contrase??a manda que hay un error
                errors.message = 'El mail o contrase??a son incorrectos'
                res.locals.errors = errors;
                return res.render('login');
            }})
                .catch(error => console.log(error))
        } 
    },
        

    store : function (req,res){ 
        let errors = {};
        // || significa or, simplifique el codigo y directamente estableci que no pueden ir con campo vacio las secciones de usuario/clave/mail/fechadenacimiento/fotodeperfil
        if(!req.body.nombre_usuario && !req.body.email && !req.body.fecha && !req.body.foto_perfil){
            errors.message = 'No puede haber campos incompletos.';
            res.locals.errors = errors;
            return res.render('register');
        } else if(req.body.password.length <3){ //que la clave no tenga menos de 3 carcateres
            errors.message = 'La contrase??a debe tener mas de 3 caracteres';
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
                    contrase??a: bcrypt.hashSync(req.body.password, 10),
                    foto_perfil: req.file.filename,
                    fecha: req.body.fecha
                  }  
                  users.create(user)
                  .then(function(user){   
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
                    contrase??a: bcrypt.hashSync(req.body.password, 10),
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

    logout: function(req,res){  
        req.session.destroy();
        if(req.cookies.userId !== undefined){
            res.clearCookie('userId')
        }
        return res.redirect('/');
    },

    seguir: function (req, res) {
            seguidores.create({
            seguidor_id: req.session.user.id,
            seguido_id: req.params.id
        }) 

        .then(()=> res.redirect('/users/profile'+req.params.id))

        .catch(errors => console.log(errors))
        
    },

    dejar_seguir: function (req, res) {
        seguidores.destroy({
            where: { seguidor_id: req.session.user.id, seguido_id: req.params.id }
           
        }) 

        .then(()=> res.redirect('/user/profile/'+req.params.id))

        .catch(errors => console.log(errors))
    },

}

module.exports = usersController;

//cada controlador renderiza las vistas que se requieren en cada caso.