const request = require('request');

var geoCodeAddress = (address, callback) => {

  // Encode address from user to use in the url request
  // This inputs %20 to the spaces need for url request
  var encodedAddress = encodeURIComponent(address);

  // Call the Google API
  request({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
      // tells request to take json and convert it into an object
      json: true
  }, (error, response, body) => {
    // Error handling
    if (error) {
      callback("Unable to connect to the Google Severs");
    } else if (body.status === "ZERO_RESULTS") {
      callback("Unable to find that adress");
    } else if (body.status === "OK") {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longtitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geoCodeAddress = geoCodeAddress;
