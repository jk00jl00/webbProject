var express = require('express');
var router = express.Router(); 
var imController = require("../controllers/appController.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/draw', function(req, res, next) {
  imController.rndmLabel(req, res);
});

router.post('/draw', function(req, res, next) {
  imController.newImage(req, res);
});

router.get('/guess', function(req, res, next) {
  imController.getGuess(req, res);
});

router.post('/guess', function(req, res, next) {
  imController.postGuess(req, res);
})

router.post('/confirm', function(req, res, next) {
  imController.confirm(req, res);
})

module.exports = router;
