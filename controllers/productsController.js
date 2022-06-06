const data = require('../db/data');

var productsController = {
    index : function (req,res){
        res.render('product', {comentarios: data.comentarios});
    },

    productAdd : function (req,res){
        res.render('product-add', {
            usuario: usuario,
            comentarios: comentarios,

        });
    }
};


module.exports = productsController;