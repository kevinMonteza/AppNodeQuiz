var express = require('express');
var router = express.Router();

var quiz_controller = require('../controller/Controller');

/* GET home page. */
router.get('/',(req, res, next)=> {
  res.render('index', { title: 'Quiz' });
});
router.param('quizId',quiz_controller.load);// autoload quizId
router.get('/quizes',quiz_controller.index);
router.get('/quizes/:quizId(\\d+)',quiz_controller.show);
router.get('/quizes/:quizId(\\d+)/answer',quiz_controller.answer);
router.get('/quizes/new',quiz_controller.new);
router.post('/quizes/create',quiz_controller.create);

module.exports = router;
