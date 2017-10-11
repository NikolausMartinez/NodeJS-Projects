const request = require ('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: 'https://api.darksky.net/forecast/7ea97f16e8dfa760014a315027478313/' + lat + ',' + lng ,
    json: true
  }, (error, response, body) => { // callback function wants the http request finishes
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    } else {
      callback('Unable to fetch weather');
    }
  });
};

module.exports.getWeather = getWeather;
