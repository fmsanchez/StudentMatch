var express = require('express');
var router = express.Router();
var models  = require('../models');
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  var y = "yuuup";
  request.get(
    {
      url: 'https://api.parse.com/1/classes/event',
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': 'FeAIm23Ei1ETHqDF2tHKRy8JLUfoeHHtMeqorFzm',
        'X-Parse-REST-API-Key': 'd1ND35gvYaS8qrmxBysx5Hm2fPXcKxKbOTZG8RwN'
      },
      json: true
    },
    function(error, response, body) {
      if (error) {
        res.render('index/home', {events: [], attending: []});
      } else {
        var data = body['results'];
        data.sort(function(a, b) {
          var dA = new Date(a['event_date']);
          var dB = new Date(b['event_date']);
          return dA.getTime() > dB.getTime();
        });
        request.get(
          {
            url: 'https://api.parse.com/1/classes/event?where={"attendees":{"__type":"Pointer","className":"_User","objectId":"bYod2vV5R2"}}',
            method: 'GET',
            headers: {
              'X-Parse-Application-Id': 'FeAIm23Ei1ETHqDF2tHKRy8JLUfoeHHtMeqorFzm',
              'X-Parse-REST-API-Key': 'd1ND35gvYaS8qrmxBysx5Hm2fPXcKxKbOTZG8RwN'
            },
            json: true
          },
          function(error, response, body) {
            if (error) {
              res.render('index/home', {events: [], attending: []});
            } else {
              data0 = body['results'];
              console.log(data0)
              data0.sort(function(x, y) {
                var dx = new Date(x['event_date']);
                var dy = new Date(y['event_date']);
                return dx.getTime() > dy.getTime();
              });
              res.render('index/home', {events: data, attending: data0});
            }
          }
        );
        //res.render('index/home', {events: data});
      }
    }
  );

  // models.Event.findAll({
  //   order: 'startdate'
  // }).then(function(events) {
  //   res.render('index/home', { events: events });
  // });
});

module.exports = router;
