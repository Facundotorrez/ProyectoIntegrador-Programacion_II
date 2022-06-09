module.exports = function (sequelize, dataTypes){ //los modelos son funciones, los mismos exportan una funcion.

    let alias = 'Comentario'; // El alias sirve para identificar al modelo cuando lo usamos en el controlador.

    let cols = { //objeto literal
        
        id_comentario:{ //declaro las columnas de la base de datos
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },

        comentario: {
            type:dataTypes.STRING
        },

        id_producto: {
            type: dataTypes.INTEGER
        },

        id_usuario: {
            type: dataTypes.INTEGER
        },

        createdAt:{
            type: dataTypes.DATE,
            allowNull: true
        },

        updatedAt:{
            type: dataTypes.DATE,
            allowNull: true
        }
    }

// configuraciones extras

    let config = {
        tableName: 'comentarios', //nombre de la tabla nuestra.
        timestamps: false, // si la tabla no tiene las columnas createdAt y updatedAt.
        underscored: true, // si la tabla tiene columnas con nombres usando guiones bajos o camelcase.
    }

    const Comentario = sequelize.define(alias, cols, config);

//Relaciones entre nuestras tablas

    Comentario.associate = function(models){
        Comentario.belongsTo(models.Usuario, {
            as: 'usuario',
            foreignKey: 'id_usuario'
        })

        Comentario.belongsTo(models.Producto, {
            as: 'producto',
            foreignKey: 'id_producto'
        })
    }
    return Comentario;
}