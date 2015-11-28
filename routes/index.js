var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  models.Event.findAll({
    order: 'startdate'
  }).then(function(events) {
    res.render('index/home', { events: events });
  });
});

module.exports = router;
