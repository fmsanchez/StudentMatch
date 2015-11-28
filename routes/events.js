var models  = require('../models');
var express = require('express');
var router = express.Router();

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
  models.Attending.create({
    user_id: 1,
    event_id: eventId
  }).then(function(entry) {
    entry.save();
    models.Event.findById(eventId).then(function(result) {
      if (result) {
        result.attending += 1;
        result.save();
        var json = JSON.stringify(result);
        res.set('Content-Type', 'application/json');
        res.end(json);
      }
    });
  });
});

router.get('/:id', function(req, res, next) {
  console.log("params: ", req.params);
  models.Event.findById(req.params['id']).then(function(result) {
    res.render('events/view', { even: result });
  });
});

router.post('/create', function(req, res, next) {
  var startDay = req.body.startDate;
  var startTime = req.body.startTime;
  var startDate = startDay + ' ' + startTime;

  var endDay = req.body.endDate;
  var endTime = req.body.endTime;
  var endDate = endDay + ' ' + endTime;
  console.log(startDate);
  console.log(endDate);

  var evnt = Parse.Object.extend('event');
  evnt.set('event_capacity', req.body.eventCapacity);
  evnt.set('event_category_name', req.body.eventCategory);
  evnt.save(null, {
    success: function(evnt) {
      alert("Event created successfully");
    }
    alert: function(evnt, error) {
      alert("Error creating event");
    }
  });


  // models.Event.create({
  //   name: req.body.eventName,
  //   description: req.body.eventDescription,
  //   category: req.body.eventCategory,
  //   location: req.body.eventLocation,
  //   geolocation: req.body.eventGeoLocation,
  //   capacity: req.body.eventCapacity,
  //   startdate: startDate,
  //   created_by: 2,
  //   enddate: endDate
  // }).then(function(entry) {
  //   entry.save();
  //   var json = JSON.stringify(entry);
  //   res.set('Content-Type', 'application/json');
  //   res.end(json);
  // });
})

module.exports = router;