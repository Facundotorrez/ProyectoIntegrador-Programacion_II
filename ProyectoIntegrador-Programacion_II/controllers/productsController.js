const data = require('../db/data');

var productsController = {
    index : function (req,res){
        res.render('product')
    },

    productAdd : function (req,res){
        res.render('product-add')
    }
    
}





module.exports = productsController;