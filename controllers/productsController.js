const data = require('../db/data');
const db = require('../database/models');
const productos = db.Producto //requiero de la db los modelos que estan bajo el alias Producto y le estableci la variable productos
const op = db.Sequelize.Op; // lo necesito para poder trabajar con los operadores de sequelize cuando use where
const comentarios = db.Comentario; // llamo al modulo de comentarios 
const usuarios = db.Usuario;

var productsController = {
    index : function (req,res){
        res.render('product', {comentarios: data.comentarios});
    },

    index: function(res, res){
        productos.findAll({
            include: [
                {association: 'producto'}
            ]
        })
        .then( function (productos){
            return res.render('index', {productos:productos}); //nose si esta bien lo que llame, chequear nombre propiead y eso
        })
        .catch(error => console.log(error))
    },

    show: function(req,res){
        productos.findOne({
            include: [{id: req.params.id}] // le hago request al params para que me pase el id
        })
        .then(function(unProducto){
         // mostrar los comentarios ordenados
         // createdAt es una timestam que me permite saber cuando fueron creados los comentarios, lo que me sirve para saber el orden de llegada a la db. Asi los puedo expresar orderly
         let ordenDeComentarios = unComentario.comentarios.slice().sort((a,b) => b.createdAt - a.createdAt); 
         unComentario.comentarios = ordenDeComentarios; //preguntar a martin se borrar 
         //hay que agregar un res.send?

            let comentarios = [];  //lo puse ale en el repositorio asi, define la variable de comentarios
            if(unProducto.comentario[0] !=undefined){
                for(let i=0; i < unProducto.comentarios.length; i++){
                    usuarios.findOne({ //me dice que usuario hizo el comentario y lo pide
                        where: [{id: unComentario.comentarios[i].FKUserId}]
                    })
                    .then(function(unaPersonaQueComenta){
                        comentarios.push(unaPersonaQueComenta);
                        if(i == unComentario.comentarios.length - 1){
                            return res.render('product',{info: unComentario, comentarios: comentarios, id: req.params.id});
                        }
                    })
                }
            } else {
                return res.render('product', {info: unComentario, comentarios: [], id: req.params.id});
            }
        })
        .catch(error => console.log(error))
    },

    productAdd : function (req,res){
        res.render('product-add', {
            usuario: data.usuarios,
            comentarios:data.comentarios,

        });
    },

    editar: function(req, res){
        productos.findByPk(req.params.id)
        .then(producto=> {
            res.render('product-editar',{
                info:producto
            })
        })
        .catch(error => console.log(error))
    },

    store: function(req,res){
        let productos = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion
        }
        productos.create(productos)
        .then( function(producto){
            return res.redirect('/index')
        })
        .catch( error => console.log(error))
    },

    
    
}


module.exports = productsController;