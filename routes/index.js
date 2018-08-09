let express = require('express');
let router = express.Router();

let quiz_controller = require('../controller/Controller');
let comment_controller = require('../controller/CommentController');
let session_controller = require('../controller/sessionController');


/* GET home page. */
router.get('/',(req, res, next)=> {
  res.render('index', { title: 'Quiz',errors:[] });
});

//Quiz autoload
router.param('quizId',quiz_controller.load);// autoload quizId
router.param('commentId',comment_controller.load);// autoload :commentId

//Definicion de las rutas de sesion
router.get('/login',session_controller.new);  //formulario login
router.post('/login',session_controller.create);//inciar sesion
router.get('/logout',session_controller.destroy);



router.get('/quizes',quiz_controller.index);
router.get('/quizes/:quizId(\\d+)',quiz_controller.show);
router.get('/quizes/:quizId(\\d+)/answer',quiz_controller.answer);


router.get('/quizes/new',session_controller.loginRequired,quiz_controller.new);
router.post('/quizes/create',session_controller.loginRequired,quiz_controller.create);
router.get('/quizes/:quizId(\\d+)/edit',session_controller.loginRequired,quiz_controller.edit);
router.put('/quizes/:quizId(\\d+)',session_controller.loginRequired,quiz_controller.update);
router.delete('/quizes/:quizId(\\d+)',session_controller.loginRequired,quiz_controller.destroy);


router.get('/quizes/:quizId(\\d+)/comments/new',comment_controller.new);
router.post('/quizes/:quizId(\\d+)/comments/',comment_controller.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',session_controller.loginRequired,comment_controller.publish);

module.exports = router;
