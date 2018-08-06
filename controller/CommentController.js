let models = require('../models/models');


exports.new = (req,res)=>{
    console.log(req.params.quizId);
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
