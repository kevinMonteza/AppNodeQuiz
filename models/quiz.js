/* definicion del modelo

    
 */

module.exports =(sequelize,dataTypes)=>{
    return sequelize.define('Quiz',{
        pregunta : dataTypes.STRING,
        respuesta : dataTypes.STRING,
    });
};