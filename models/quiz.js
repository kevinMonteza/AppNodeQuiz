/* definicion del modelo

    
 */

module.exports =(sequelize,dataTypes)=>{
    return sequelize.define('Quiz',{
        pregunta :{
            type:dataTypes.STRING,
            validate:{notEmpty:{msg:"->falta pregunta"}}},
        respuesta : {
            type:dataTypes.STRING,
            validate:{notEmpty:{msg:'->falta respuesta'}}
        }
    });
};