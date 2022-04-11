
const data = require('../db/data');

var indexController = {
    index : function(req,res) {

        res.render('index', {libros: data.libros});
    },

    searchResults : function(req,res){
        res.render('search-results')
    },
}





module.exports = indexController;