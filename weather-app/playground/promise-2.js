const request = require('request');

var geoCodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    // Encode address from user to use in the url request.
    // This inputs %20 to the spaces need for url request.
    var encodedAddress = encodeURIComponent(address);

    // Calls the Google API
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
        // Tells request to take json and convert it into an object.
        json: true
    }, (error, response, body) => { // Callback function wants the http request finishes

      // Error handling
      if (error) {
        reject("Unable to connect to the Google Severs.");
      } else if (body.status === "ZERO_RESULTS") {
        reject("Unable to find that adress.");
      } else if (body.status === "OK") {

        // Send data we received from the Google API back to the app.js
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longtitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geoCodeAddress('191f6').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
