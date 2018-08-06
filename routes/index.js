let express = require('express');
let router = express.Router();

let quiz_controller = require('../controller/Controller');
let comment_controller = require('../controller/CommentController');



/* GET home page. */
router.get('/',(req, res, next)=> {
  res.render('index', { title: 'Quiz',errors:[] });
});
router.param('quizId',quiz_controller.load);// autoload quizId
router.get('/quizes',quiz_controller.index);
router.get('/quizes/:quizId(\\d+)',quiz_controller.show);
router.get('/quizes/:quizId(\\d+)/answer',quiz_controller.answer);
router.get('/quizes/new',quiz_controller.new);
router.post('/quizes/create',quiz_controller.create);
router.get('/quizes/:quizId(\\d+)/edit',quiz_controller.edit);
router.put('/quizes/:quizId(\\d+)',quiz_controller.update);
router.delete('/quizes/:quizId(\\d+)',quiz_controller.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new',comment_controller.new);
router.post('/quizes/:quizId(\\d+)/comments/',comment_controller.create);

module.exports = router;
