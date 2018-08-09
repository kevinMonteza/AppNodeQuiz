let models = require('../models/models');

exports.load = (req,res,next,commentId)=>{
    console.log("Load comentario iD"+commentId);
    models.Comment.find({
        where: {
            id:Number(commentId)
        }
    })
        .then((comment)=>{
            if(comment){
                req.comment = comment;
                next();
            }else{
                next(new Error('No existe comentario de la pregunta:' + commentId));
            }
    })
        .catch((err)=>{
            next(err);
        });
};

exports.new = (req,res)=>{
    res.render('comments/new',{quizId:req.params.quizId,errors:[]});
};

exports.create = (req,res)=>{
  let comment = models.Comment.build({
     texto:req.body.comment.texto,
     QuizId:req.params.quizId
  });
  comment.save()
      .then(()=>{
        res.redirect('/quizes/'+req.params.quizId);
      })
      .catch((err)=>{
        res.redirect('comments/new.ejs',{comment:comment,errors: err.errors});
      })
  };

exports.publish = (req,res)=>{
    console.log("Publish comment "+req.comment);
    req.comment.publicado = true;
    req.comment.save({fields: ['publicado']})
        .then(()=>{
            res.redirect('/quizes/'+req.params.quizId);
        })
        .catch((err)=>{
            next(err);
        })
};
