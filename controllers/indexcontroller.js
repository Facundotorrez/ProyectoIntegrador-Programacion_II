const { send
 } = require('express/lib/response');
 const db = require('../database/models')
 const productos = db.Producto
 const usuarios = db.Usuario
 const op = db.Sequelize.Op;

var indexController = {
   index: function (req, res) {
      productos.findAll({
            include: [{
               association: 'usuario'
            }, {
               association: 'comentario'
            }],
            order: [
               ['created_at', 'ASC']
            ]
         })
         .then(function (productos) {
            return res.render('index', {
               productos: productos,
            })
         })
         // res.send(productos)

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