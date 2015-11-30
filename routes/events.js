var models  = require('../models');
var express = require('express');
var router = express.Router();
var Parse = require('parse/node');
var request = require('request');

/* GET events. */

router.get('/', function(req, res, next) {
  models.Event.findAll().then(function(events) {
    var json = JSON.stringify(events);
    res.set('Content-Type', 'application/json');
    res.end(json);
  });
});

router.get('/create', function(req, res, next) {
  res.render('events/create');
});

router.get('/:id/attending', function(req, res, next) {
  var event_id = req.params.id;
  models.Attending.findAll({
    where: {
      event_id: event_id
    }
  }).then(function(entries) {
    var json = JSON.stringify(entries);
    res.set('Content-Type', 'application/json');
    res.end(json);
  });
});

router.post('/attend/', function(req, res, next) {
  var eventId = req.body.eventId;
  console.log(eventId.toString());

  var data0 = {
    "attendees": 
      {
        "__op": "AddRelation",
        "objects": [
          {"__type": "Pointer", "className": "_User", "objectId": "bYod2vV5R2"}
        ]
      }
  }

  var data1 = {
    "attends": 
      {
        "__op": "AddRelation",
        "objects": [
          {"__type": "Pointer", "className": "event", "objectId": eventId.toString()}
        ]
      }
  }
  console.log('sending');

  request.put(
    {
      url: 'https://api.parse.com/1/classes/_User/bYod2vV5R2',
      method: 'PUT',
      json: true,
      headers: {
        'X-Parse-Application-Id': 'FeAIm23Ei1ETHqDF2tHKRy8JLUfoeHHtMeqorFzm',
        'X-Parse-REST-API-Key': 'd1ND35gvYaS8qrmxBysx5Hm2fPXcKxKbOTZG8RwN',
        'Content-Type': 'application/json',
        'X-Parse-Session-Token': 'r:wWBagT2Pso1dbAi03siAlmi7h'
      },
      body: data1
    },
    function(error1, response1, body1) {
      if (error1) {
        console.log(error1);
      } else {
        console.log('success');
      }
    }
  );

  request.put(
    {
      url: 'https://api.parse.com/1/classes/event/' + eventId.toString(),
      method: 'PUT',
      json: true,
      headers: {
        'X-Parse-Application-Id': 'FeAIm23Ei1ETHqDF2tHKRy8JLUfoeHHtMeqorFzm',
        'X-Parse-REST-API-Key': 'd1ND35gvYaS8qrmxBysx5Hm2fPXcKxKbOTZG8RwN',
        'Content-Type': 'application/json'
      },
      body: data0
    },
    function(error0, response0, body0) {
      if (error0) {
        res.end(error0.toString());
      } else {
        res.end(body0.toString());
      }
    }
  );


  // models.Attending.create({
  //   user_id: 1,
  //   event_id: eventId
  // }).then(function(entry) {
  //   entry.save();
  //   models.Event.findById(eventId).then(function(result) {
  //     if (result) {
  //       result.attending += 1;
  //       result.save();
  //       var json = JSON.stringify(result);
  //       res.set('Content-Type', 'application/json');
  //       res.end(json);
  //     }
  //   });
  // });
});

router.get('/:id', function(req, res, next) {
  request.get(
    {
      url: 'https://api.parse.com/1/classes/event/' + req.params['id'],
      method: 'GET',
      json: true,
      headers: {
        'X-Parse-Application-Id': 'FeAIm23Ei1ETHqDF2tHKRy8JLUfoeHHtMeqorFzm',
        'X-Parse-REST-API-Key': 'd1ND35gvYaS8qrmxBysx5Hm2fPXcKxKbOTZG8RwN'
      }
    },
    function(error, response, body) {
      if (error) {
        res.render('error', {
          message: 'Event not found',
          error: {}
        });
      } else {
        res.render('events/view', { even: body });
      }
    }
  );
});

router.post('/create', function(req, res, next) {
  var startDay = req.body.startDate;
  var event_date = startDay.split('-');
  var day = event_date[2];
  var month = event_date[1];
  var year = event_date[0];
  event_date = month + '/' + day + '/' + year;
  var event_start_time = req.body.startTime;
  var event_end_time = req.body.endTime;
  var data = {
    'event_name': req.body.eventName, 'event_capacity': parseInt(req.body.eventCapacity),
    'event_category_name': req.body.eventCategory, 'event_creator': 'bYod2vV5R2',
    'event_duration': 0, 'event_date': event_date, 'event_start_time': event_start_time,
    'event_description': req.body.eventDescription, 'event_end_time': event_end_time,
    'event_location': {
      '__type': 'GeoPoint',
      'latitude': 33.775928,
      'longitude': -84.38902 
    }
  };
  request.post(
    {
      url: 'https://api.parse.com/1/classes/event',
      method: 'POST',
      json: true,
      headers: {
        'X-Parse-Application-Id': 'FeAIm23Ei1ETHqDF2tHKRy8JLUfoeHHtMeqorFzm',
        'X-Parse-REST-API-Key': 'd1ND35gvYaS8qrmxBysx5Hm2fPXcKxKbOTZG8RwN'
      },
      body: data
    },
    function(error, response, body) {
      if (error) {
        res.end(error);
      } else {
        res.end(body);
      }
    }
  );
});

module.exports = router;