var request = require('request');

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
        res.render('index/home', {events: []});
      } else {
        var data = body['results'];
        data.sort(function(a, b) {
          var dA = new Date(a['event_date']);
          var dB = new Date(b['event_date']);
          return dA.getTime() > dB.getTime();
        });
        res.render('index/home', {events: data});
      }
    }
  );