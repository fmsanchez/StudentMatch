var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users) {
    var json = JSON.stringify(users);
    res.set('Content-Type', 'application/json');
    res.end(json);
  });
});

router.post('/create', function(req, res, next) {
	models.User.create({
		name: req.body.username
	}).then(function(user) {
		user.save;
		var json = JSON.stringify(user);
		res.set('Content-Type', 'application/json')
		res.end(json);
	})
});

module.exports = router;
