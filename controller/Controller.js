var models =require('../models/models');

/*exports.question = (req,res)=>{
   // res.render('quizes/question',{pregunta:'Capital de Italia'});
    models.Quiz.findAll()
        .then((quiz)=>{
             res.render('quizes/question',{ pregunta:quiz[0].pregunta});
        })
};*/

//quizes/show

exports.load =(req, res, next, quizId)=>{
    models.Quiz.findById(quizId).then(quiz=>{
        if(quiz){
            req.quiz=quiz;
            next();
        }else{
            next(new Error(`No existe quizId ${quiz}`));
        }
    })
};
exports.show = (req,res)=>{
    res.render('quizes/show',{quiz:req.quiz});
};
//quizes/:quizId(\\d)/answer
exports.answer = (req,res)=>{
    console.log(req.query.respuesta.toUpperCase());
    let resultado='Incorrecta';
    if(req.query.respuesta.toUpperCase()===req.quiz.respuesta.toUpperCase()){
        resultado="Correcta !!!";
    }
    res.render('quizes/answer',{quiz:req.quiz, respuesta:resultado});


    /*if(req.query.respuesta.toUpperCase() === "ROMA"){
            res.render('quizes/answer',{respuesta:"correcta"});
        }else{
            res.render('quizes/answer',{respuesta:'Incorrecta'});
        }*/
};
//quizes/
exports.index = (req,res)=>{
    models.Quiz.findAll().then(quizes=>{
        res.render('quizes/index.ejs',{quizes:quizes});
    }).catch(err=>{
            next(err);
        })
};
