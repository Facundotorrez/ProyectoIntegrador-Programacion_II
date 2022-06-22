
const db = require('../database/models');
const data = require('../db/data');
//requerimos lo que necesitamos de los modelos
//habilitamos la funcionalidad de los operadores de sequelize
const productos = db.Producto;
const usuarios = db.Usuario; 
const comentarios = db.Comentario;
const op = db.Sequelize.Op; // operadores de sequelize

var indexController = {
    index : function(req,res) {
        productos.findAll ({
            order: [['created_at', 'DESC']],
            limit: 4,
            include: [{association: 'usuario'}, ] //es el nombre que uno saca de los modelos
        })
        .then(function(productos){
         // res.send(productos)
          res.render('index', {libros:productos});
        })
        .catch(error => console.log(error))
        
    },
    //estableciendo el navegador
    searchResults : function(req,res){
        let errors = {};  
        let productoBuscar = req.query.search;  //acordarse que search es lo que aparece en la url, search= donde estoy 
        productos.findAll({
            where: {
                [op.or]: [
                    {titulo:{[op.like]: '%' + productoBuscar + '%'}},
                    {descripcion: {[op.like]: '%' + productoBuscar + '%'}},
                ]
            },
            include: [{association: 'usuario'}]
        })
        .then((data) => {
            if(data !==null){
                return res.render('search-results', {productos: productoBuscar})
            } else {
                errors.message = 'No hay resultados para su criterio de búsqueda';
                res.locals.errors = errors;
                return res.render('search-results');
            }
            
        })

        .catch(error => console.log(error))

    },
}





module.exports = indexController; 