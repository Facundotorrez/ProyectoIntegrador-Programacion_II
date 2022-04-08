var user = require('../db/users');
var  products = require('../db/products');
var comments = require('../db/comments');

var productsController = {
    index : function (req,res){
        res.render('product')
    },

    productAdd : function (req,res){
        res.render('product-add')
    }
    
}





module.exports = productsController;