const data = require('../db/data');
const db = require('../database/models');
const bcrypt = require('bcryptjs'); //preguntar a ale xq no me llama
const usuario = require('../database/models/usuario');

const users = db.Usuario;

const usersController = {
    login : function (req,res){
        res.render('login')
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
    
    store : function (req,res){
        let errors = {}
        // || significa or, simplifique el codigo y directamente estableci que no pueden ir con campo vacio las secciones de usuario/clave/mail/fechadenacimiento/fotodeperfil
        if(!req.body.usuario || !req.body.email || !req.body.birthdate || req.body.foto){
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
                  
        
                }
            })
        }
    }    
}

module.exports = usersController;

//cada controlador renderiza las vistas que se requieren en cada caso.