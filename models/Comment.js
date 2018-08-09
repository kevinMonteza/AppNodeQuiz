module.exports = (sequelize,dataTypes) =>{
    return sequelize.define('Comment',{
        texto:{
            type:dataTypes.STRING,
            validate:{notEmpty:{msg:'->Falta comentario'}}
        },
        publicado:{
            type:dataTypes.BOOLEAN,
            defaultValue: false
        }
    })
};