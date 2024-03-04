var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cat Pictures' });
});

/* Error page. */
router.get('/noncat', function(req, res, next) {
  res.render('noncat');
});

/* Upload page. */
router.post('/cat', function(req, res, next) {
  console.log("Got POST")
  console.log(req.body);
  res.render('success');
});

/* Upload page. */
router.put('/cat', function(req, res, next) {
  console.log("Got PUT")
  console.log(req.body);
  res.render('success');
});

/* Upload page. */
router.get('/cat', function(req, res, next) {
  res.render('success');
});


module.exports = router;
