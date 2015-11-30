var request = require('request');

request.get(
    {
      url: 'https://api.parse.com/1/classes/event/rw8O57cjm6',
      method: 'GET',
      json: true,
      headers: {
        'X-Parse-Application-Id': 'FeAIm23Ei1ETHqDF2tHKRy8JLUfoeHHtMeqorFzm',
        'X-Parse-REST-API-Key': 'd1ND35gvYaS8qrmxBysx5Hm2fPXcKxKbOTZG8RwN'
      }
    },
    function(error, response, body) {
      if (error) {

      } else {
        //res.render('events/view', { even: body['result'] })
      }
      console.log(error);
      console.log(body);
    }
  );