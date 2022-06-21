
const db = require('../database/models');
const data = require('../db/data');
//requerimos lo que necesitamos de los modelos
//habilitamos la funcionalidad de los operadores de sequelize
const productos = db.Producto;
const usuarios = db.Usuarios; 
const comentarios = db.Comentario;
const op = db.Sequelize.Op; // operadores de sequelize

var indexController = {
    index : function(req,res) {
        productos.findAll ({
            include:[{association: 'owner'}, {association:'comentarios'}],
            order:[['createdAt', 'DESC']],
            limit: 4
        })
        .then(function(productos){
          //  productos.
        })
        
    },

    searchResults : function(req,res){
        res.render('search-results')
    },
}





module.exports = indexController; 