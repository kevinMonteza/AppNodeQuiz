exports.new = (req,res)=>{
  let errors = req.session.errors || {};
  req.session.errors={};

  res.render('sessions/new',{errors:errors});
};
exports.create= (req,res) =>{
  let  login = req.body.login;
  let password = req.body.password;

  let user_controller = require('./userController');
  user_controller.autenticar(login,password,(err,user)=>{
      if(err){
          req.session.errors=[{"Message":"Se ha producido un error"+err}];
          console.log(req.session.errors);
          res.redirect('/login');
          return;
      }
      //crer req.session.user y guardar campos id username
      //La sesion se define por la existencia de: req.sesion.user
      req.session.user={id:user.id,username:user.username};

      res.redirect(req.session.redir.toString());  // redirect a path anterior a login
  });
};
exports.destroy = (req,res)=>{
  delete req.session.user;
  res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};
exports.loginRequired = (req,res)=>{
  if(req.session.user){
      next();
  }else{
      res.redirect('/login');
  }
};
