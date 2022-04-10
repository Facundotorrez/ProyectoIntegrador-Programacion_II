const data = require('../db/data');
const usersController = {
    login : function (req,res){
        res.render('login')
    },

    register : function (req,res){
        res.render('register')
    },

    profileEdit : function (req,res){
        res.render('profile-edit')
    },

    profile : function (req,res){
        res.render('profile')
    }

}

module.exports = usersController;

//cada controlador renderiza las vistas que se requieren en cada caso.

