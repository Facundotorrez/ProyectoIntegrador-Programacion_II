module.exports = function (sequelize, dataTypes){

    let alias = 'Seguidor';

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },

        seguidor_id:{
            type:dataTypes.INTEGER
        },

        seguido_id:{
            type:dataTypes.INTEGER
        },

        createdAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        },

    }

    //Configuraciones adicionales
    let config = {
        tableName: 'seguidores', //Nombre de la tabla en la base de datos.
        timestamps: true, //Si la tabla no tiene los campos createdAt y updatedAt.
    }

    const Seguidor = sequelize.define(alias, cols, config);

    Seguidor.associate = function(models){ //seguidor: va a estar asociado a otros modelos
        Seguidor.belongsTo(models.Usuario, { //en este caso, un seguidor pertenece a un seguidor. belongsto: pertenece a...
            as: 'Seguidor',
            foreignKey: 'seguidor_id'
        });
        Seguidor.belongsTo(models.Usuario, {
            as: 'seguido',
            foreignKey:'seguido_id'
        })
    }

    return Seguidor;
}