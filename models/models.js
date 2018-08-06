var path = require('path');
/*
var sequelize = new Sequelize(null,null,null,
     {dialect:'sqlite',storage:'quiz.sqlite'}
     );*/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
    { dialect:  protocol,
        protocol: protocol,
        port:     port,
        host:     host,
        storage:  storage,  // solo SQLite (.env)
        omitNull: true      // solo Postgres
    }
);



// Importar definicion de la tabla Quiz
let quiz_path = path.join(__dirname,'quiz');
let Quiz = sequelize.import(quiz_path);

//Importar definicion de la tabla Coment
let comment_path = path.join(__dirname,'Comment');
let Comment = sequelize.import(comment_path);

/*
   *Asignacion de relaciones de las tablas
 */
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);


exports.Quiz = Quiz;
exports.Comment = Comment;

sequelize.sync().then(()=>{
          Quiz.count().then(count=>{
                  console.log("Nro de preguntas"+count);
                    if(count===0){
                         Quiz.create({
                             pregunta:"¿ Cual es la capital de Italia?",
                             respuesta:"Roma"
                         });
                         Quiz.create({
                             pregunta:"¿ Cual es la capital de Portugal?",
                             respuesta:"Lisboa"
                         })
                        .then(()=>{
                            console.log("data base initialized")
                        })
                    }
              })
              .catch((err)=>{
                   console.error(`Error ${err.message}`);
              })
     });