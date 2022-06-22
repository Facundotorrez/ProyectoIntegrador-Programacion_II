const data = require('../db/data');
const db = require('../database/models');
const productos = db.Producto //requiero de la db los modelos que estan bajo el alias Producto y le estableci la variable productos
const op = db.Sequelize.Op; // lo necesito para poder trabajar con los operadores de sequelize cuando use where
const comentarios = db.Comentario; // llamo al modulo de comentarios 
const usuarios = db.Usuario;

//multer 
const multer = require('multer');
const path = require('path');
const { dirname } = require('path');


var productsController = {
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

    show: function(req,res){ /*
        productos.findOne({
            where: [{id: req.params.id}] // le hago request al params para que me pase el id
        })
        .then(function(unProducto){
         // mostrar los comentarios ordenados
         // createdAt es una timestam que me permite saber cuando fueron creados los comentarios, lo que me sirve para saber el orden de llegada a la db. Asi los puedo expresar orderly
         let ordenDeComentarios = unComentario.comentarios.slice().sort((a,b) => b.created_at - a.created_at); 
         unComentario.comentarios = ordenDeComentarios; //preguntar a martin se borrar 
         //hay que agregar un res.send?

            let comentarios = [];  //lo puse ale en el repositorio asi, define la variable de comentarios
            if(unProducto.comentario[0] !=undefined){
                for(let i=0; i < unProducto.comentarios.length; i++){
                    usuarios.findOne({ //me dice que usuario hizo el comentario y lo pide
                        where: [{id: unComentario.comentarios[i].FKUsersId}]
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
        .catch(error => console.log(error)) */
    },

    storeComentarios:function(req, res){
        if(req.session.usuarios != undefined){
            let comentario = {
                id_producto: req.params.id,
                id_usuario: req.params.id,
                comentario: req.body.comentario
            }
            comentarios.create(comentario)
            .then(()=>{        //ale explico en clase que asi se puede simplificar el uso del then. Sustituye el poner un .then(function(loQueCorresponde){})
                return res.redirect('product' + req.params.id) //le pido a params el id del comentario 
            })
            //atrapo el error ahora y no despues del else, xq la promesa incluye la primer condicion . el else no necesita que ataje el error
            .catch(error=>  console.log(error))
        } else {
            return res.redirect('/users/login')
        }
        
    },

    update: function(req,res) {
        let errors = {};
        if (req.body.titulo == null) {
            errors.message = 'Completar el titulo';
            res.locals.errors = errors;
            return res.render('product-edit');
        } else if (req.body.descripcion == null) {
            errors.message = 'Completar descripcion';
            res.locals.errors = errors;
            return res.render('product-edit');
        } else {
            let producto = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                foto_producto: req.body.filename
            };
            productos.update(producto,
                { where: { id: req.params.id } })
                .then(function (producto) {
                    return res.redirect('product' + req.params.id);
                })
                .catch(error => console.log(error));
        }
    },

    productAdd :function (req, res) {
        if(req.session.user != undefined ){
            return res.render('product-add', { usuarios: [] });
        } else {
            return res.redirect('/users/register')
        }
        
    },

    editar: function(req, res){
        productos.findByPk(req.params.id)
        .then(producto=> {
            res.render('product-edit',{
                data:producto   //corroborar , data puede generar error sino probar con info/informacion 
            })
        })
        .catch(error => console.log(error))
    },
  

    store: function(req,res){
        let producto = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            foto_producto: req.body.filename
        }
        productos.create(producto)
        .then( function(producto){  //?xq no aparece llamada -> buscar nombre correcto
            return res.redirect('/index')  
        })
        .catch( error => console.log(error))
    },

    eliminar: function(req, res){
        productos.destroy({ where: {id: req.params.id}})
        .then(resultados =>{
            return res.redirect('/')
        })
        .catch(error => console.log(error))  
    }
}

    
    



module.exports = productsController;