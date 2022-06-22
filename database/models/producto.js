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
            as: 'usuario',
            foreignKey: 'id_usuario'
        }) //asociacion entre el modelo productos y el modelo de usuarios

        Producto.hasMany(models.Comentario, {
            as: 'comentario',
            foreignKey: 'id_producto'
        })
    }
    return Producto;
}