const data = require('../db/data');

var productsController = {
    index : function (req,res){
        res.render('product', {cometarios: data.comentarios});
    },

    productAdd : function (req,res){
        res.render('product-add')
    }
    
}





module.exports = productsController;