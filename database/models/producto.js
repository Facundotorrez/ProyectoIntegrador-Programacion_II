module.exports = function (sequelize, dataTypes){

    let alias = 'Producto'; // El alias sirve para identificar al modelo cuando lo usamos en el controlador.

    let cols = { //objeto literal

        id_producto:{ //declaro las columnas de la base de datos
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },

        titulo:{
            type: dataTypes.STRING
        },

        descripcion:{
            type: dataTypes.STRING
        },

        titulo:{
            type: dataTypes.STRING
        },

        foto_producto:{
            type: dataTypes.STRING
        },

        id_usuario:{
            type: dataTypes.INTEGER
        },

        created_at:{
            type: dataTypes.DATE,
        },

        updated_at:{
            type: dataTypes.DATE,
        },
    }



    let config = {
        tableName: 'productos', 
        timestamps: false, 
        underscored: true, 
    }

    const Producto = sequelize.define(alias,cols,config);


    Producto.associate = function (models){   
        Producto.belongsTo(models.Usuario, {
            as: 'usuario',
            foreignKey: 'id_usuario'
        }) 

        Producto.hasMany(models.Comentario, {
            as: 'comentario',
            foreignKey: 'id_producto'
        })
    }
    return Producto;
}










