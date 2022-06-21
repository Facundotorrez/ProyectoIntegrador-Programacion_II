
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
            order: [['createdAt', 'DESC']],
            limit: 4,
            include: [{association: 'User'}]
        })
        .then((productos) => {
            return res.render('index', {produtos:productos})
        })
        .catch(error => console.log(error))
        
    },
    //estableciendo el navegador
    searchResults : function(req,res){
        let errors = {};  
        let productoBuscar = req.query.search;
        productos.findAll({
            where: {
                [op.or]: [
                    {titulo:{[op.like]: '%' + search + '%'}},
                    {descripcion: {[op.like]: '%' + search + '%'}},
                ]
            },
            include: [{association: 'User'}]
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