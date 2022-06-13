module.exports = function (sequelize, dataTypes){

    let alias = 'Usuario'; // El alias sirve para identificar al modelo cuando lo usamos en el controlador.

    let cols = { //objeto literal

        id_usuario:{ //declaro las columnas de la base de datos
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre_usuario:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.INTEGER
        },
        contraseña:{
            type: dataTypes.STRING
        },
        foto_perfil:{
            type: dataTypes.STRING
        },
        fecha:{
            type: dataTypes.DATE
        },
        created_at:{
            type: dataTypes.DATE,
        },
        updated_at:{
            type: dataTypes.DATE,
        }
    }
    
//Configuraciones extras
    let config = {
        tableName: 'usuarios', //Nombre de la tabla en la base de datos.
        timestamps: true, //Si la tabla no tiene los campos createdAt y updatedAt
        underscored: true,
    }

    const Usuario =  sequelize.define(alias,cols,config);

//Relaciones entre las tablas

    Usuario.associate = function (models){   //Producto(alias).associte(asociacion de modelos) ¿como lo puedo explicar?

        Usuario.hasMany(models.Comentario, {
            as: 'comentario',
            foreignKey: 'id_usuario'
        })
        Usuario.hasMany(models.Producto, {
            as: 'producto',
            foreignKey: 'id_usuario'
        })
       /* Usuario.belongsToMany(models.Usuario, {
            as: 'seguido',
            foreignKey: 'seguidor_id',
            otherKey: 'seguido_id',
            through: 'seguidores',
            timestamps: true

        })
        Usuario.belongsToMany(models.Usuario, {
            as: 'seguidor',
            foreignKey: 'seguido_id',
            otherKey: 'seguidor_id',
            through: 'seguidores',
            timestamps: false
        })*/
    }
    return Usuario;
}