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
const producto = require('../database/models/producto');


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

    show: function(req,res){ 
        productos.findOne({
            include: [{assosciation: 'usuario'}],
            where: [{id: req.params.id}] // le hago request al params para que me pase el id
        })
        .then(function(productos){
            comentarios.findAll({
                include: [{associaion: 'usuario'}, {association: 'producto'}],
                where: [{id_producto: req.params.id}],  //puede dar error, no estoy segura si hay que pedirle a req.params.id 
                order:[[['id', 'DESC']]]
            })
            .then(function(comentarios){
                console.log(comentarios);
                return res.render('productos', {productos: productos, comentarios: comentarios})
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error)) 
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
                return res.redirect('product/' + req.params.id) //le pido a params el id del comentario 
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
                    return res.redirect('product/' + req.params.id);
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
        .then( function(){  //?xq no aparece llamada -> buscar nombre correcto
            return res.redirect('/index')  
        })
        .catch( error => console.log(error))
    },

    eliminar: function(req, res){
        productos.destroy({ where: {id: req.params.id}})
        .then(() =>{                                      //son los result removi la palabra resultados xq no aparecia llamada y simplifique codigo
            return res.redirect('/')
        })
        .catch(error => console.log(error))  
    }
}

    
    



module.exports = productsController;