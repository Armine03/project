var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var QuizDataSchema = new Schema({
  name: {type: String, required: true},
  question: String,
  level: String,
  author: String
}, {collection: 'quizdata'});

var QuizData = mongoose.model('QuizData', QuizDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  QuizData.find()
      .then(function(doc) {
        res.render('index', {items: doc});
      });
});

router.post('/insert', function(req, res, next) {
  var item = {
    name: req.body.name,
    question: req.body.question,
    level: req.body.level,
    author: req.body.author
  };

  var data = new QuizData(item);
  data.save();

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var id = req.body.id;

  QuizData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name = req.body.name;
    doc.question = req.body.question;
    doc.level = req.body.level;
    doc.author = req.body.author;
    doc.save();
  })
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  QuizData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
