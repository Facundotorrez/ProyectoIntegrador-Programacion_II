const data = require('../db/data');

var productsController = {
    index : function (req,res){
        res.render('product', {comentarios: data.comentarios});
    },

    productAdd : function (req,res){
        res.render('product-add', {
            usuario: data.usuarios,
            comentarios:data.comentarios,

        });
    },

    store: function(req, res){
        //obtengo datos del formulario
        let producto = {
            titulo: req.body.nombre-producto,
            descripcion: req.body.description
            //hay que agregar imagen 
        }
        
        productos.create(producto)
        .then( function(respuesta){
            return res.redirect('/')
        })
        .catch( error => console.log(error))
    }
};


module.exports = productsController;