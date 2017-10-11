/*
This App uses promises with the Axios library
*/
const yargs = require('yargs');
const axios = require ('axios');

// The object that stores the final parsed input from user.
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true // Tells yargs to always parse the address as a string.
    }
})
  .help()
  .alias('help', 'h') // Make alias for help.
  .argv;

// Encode address from user to use in the url request.
// This inputs %20 to the spaces need for url request.
var encodedAddress = encodeURIComponent(argv.address);

// Stores the url for the Google geocode API
var geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress;

// axios.get method will call the Google geocode API. It also returns a promise
axios.get(geoCodeUrl).then((response) => {

  // Error handling
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }

  // Variables to hold data received from Google geocode API
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  // Stores the url for the DarkSki API fetch
  var weatherUrl = 'https://api.darksky.net/forecast/7ea97f16e8dfa760014a315027478313/' + lat + ',' + lng;

  // Outputs the formated address from the Google geocode API
  console.log('');
  console.log('*******************');
  console.log('* ADDRESS ENTERED *');
  console.log('*******************');
  console.log('');
  console.log(response.data.results[0].formatted_address);

  // We return another promise to make a request for the weather data from DarkSki API
  // This will also return a promise
  return axios.get(weatherUrl);
}).then((response) => {

  // Variables to hold data received from the DarkSky API
  var summary = response.data.currently.summary;
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var dewPoint = response.data.currently.dewPoint;
  var humidity = Math.round(response.data.currently.humidity * 100);
  var windSpeed = response.data.currently.windSpeed;
  var cloudCover = Math.round(response.data.currently.cloudCover * 100);
  
  // Outputs the data received from the DarkSky API
  console.log('');
  console.log('*******************');
  console.log('* CURRENT WEATHER *');
  console.log('*******************');
  console.log('');
  console.log('It is currently ' + temperature + ' °F. It feels like ' + apparentTemperature + ' °F.');
  console.log('Summary: ' + summary);
  console.log('Dew Point: ' + dewPoint);
  console.log('Humidity: ' + humidity + ' %');
  console.log('Wind Speed: ' + windSpeed + ' mph');
  console.log('Cloud Cover: ' + cloudCover + ' %');
  console.log('');

  // Catches all the error
}).catch((e) => {

  // Outputs the erros
  if (e.code === 'ECONNREFUSED') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
