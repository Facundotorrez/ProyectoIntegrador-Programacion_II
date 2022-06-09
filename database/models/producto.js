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

        createdAt:{
            type: dataTypes.DATE,
            allowNull: true
        },

        updatedAt:{
            type: dataTypes.DATE,
            allowNull: true
        },
    }

// configuraciones extras

    let config = {
        tableName: 'comentarios', //nombre de la tabla nuestra.
        timestamps: false, // si la tabla no tiene las columnas createdAt y updatedAt.
        underscored: true, // si la tabla tiene columnas con nombres usando guiones bajos o camelcase.
    }

    const Producto = sequelize.define(alias,cols,config);

//Relaciones entre las tablas
    Producto.associate = function (models){   //Producto(alias).associte(asociacion de modelos)
        Producto.belongsTo(models.Usuario, {
            as: 'Usuario',
            ForeignKey: 'id_usuario'
        }) //asociacion entre el modelo productos y el modelo de usuarios

        Producto.hasMany(models.Comentario, {
            as: 'Comentario',
            ForeignKey: 'id_producto'
        })
    }
    return Producto;
}