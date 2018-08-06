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
    models.Quiz.find({
        where:{id:Number(quizId)},
        include :[{model:models.Comment}]
    })
        .then(quiz=>{
            if(quiz){
                console.log(quiz.Comment);
                req.quiz=quiz;
                next();
            }else{
                next(new Error(`No existe quizId ${quiz}`));
            }
    })
};
exports.show = (req,res)=>{
    res.render('quizes/show',{quiz:req.quiz,errors:[]});
};
//quizes/:quizId(\\d)/answer
exports.answer = (req,res)=>{
    console.log(req.query.respuesta.toUpperCase());
    let resultado='Incorrecta';
    if(req.query.respuesta.toUpperCase()===req.quiz.respuesta.toUpperCase()){
        resultado="Correcta !!!";
    }
    res.render('quizes/answer',{quiz:req.quiz, respuesta:resultado,errors:[]});
};
//quizes/
exports.index = (req,res)=>{
    models.Quiz.findAll().then(quizes=>{
        res.render('quizes/index.ejs',{quizes:quizes,errors:[]});
    }).catch(err=>{
            next(err);
        })
};
exports.new = (req,res)=>{
   let quiz =  models.Quiz.build({
        pregunta:'pregunta',respuesta:"respuesta"
    });
    res.render('quizes/new',{quiz:quiz,errors:[]});
};
exports.create = (req,res)=>{
    let quiz = models.Quiz.build(req.body.quiz);
    quiz.save({fields:['pregunta','respuesta']})
        .then(()=>{
            res.redirect('/quizes');
        })
        .catch((err)=>{
            res.render('quizes/new',{quiz:quiz,errors:err.errors});
        })
};
exports.edit = (req,res)=>{
     let quiz=req.quiz; // variable quiz cargada en el autoload
     res.render('quizes/edit',{quiz:quiz,errors:[]});
};
exports.update = (req,res)=>{
   req.quiz.pregunta = req.body.quiz.pregunta;
   req.quiz.respuesta = req.body.quiz.respuesta;

   req.quiz
       .save({fields:['pregunta','respuesta']})
       .then(()=>{
           res.redirect('/quizes')
       })
       .catch(err=>{
           res.render('quizes/edit',{quiz:req.quiz,errors:err.errors});
       })
};
exports.destroy = (req,res)=>{
    req.quiz.destroy()
        .then(()=>{res.redirect('/quizes')})
        .catch((err)=>{next(err)})
};












/*if(req.query.respuesta.toUpperCase() === "ROMA"){
            res.render('quizes/answer',{respuesta:"correcta"});
        }else{
            res.render('quizes/answer',{respuesta:'Incorrecta'});
        }*/

/* quiz.validate().then((err)=>{
        console.log(err);
            if(err){
                res.render('quizes/new',{quiz:quiz,errors:err.errors});
            }else{
                console.log("en el else");
                quiz.save({fields:['pregunta','respuesta']})
                    .then(
                    ()=>{
                        res.redirect('/quizes');
                    }
                )
            }
        })*/