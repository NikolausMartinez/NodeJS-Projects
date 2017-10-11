/*
This app uses callbacks with request method
*/

const yargs = require('yargs');
const geoCode = require('./geoCode/geoCode');
const weather = require('./weather/weather');

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

// Call the Google API function in get geo data.
geoCode.geoCodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    // Output error message from Google geo API.
    console.log(errorMessage);
  } else {
    // JSON.stringify shows all the properties in a object
    // the second argument is to filter out properties. Don't want that so set it to undefined
    // third argument formats the JSON. 2 spaces for indentation.
    //console.log(JSON.stringify(body, undefined, 2))
    //console.log(JSON.stringify(results, undefined, 2));

    // Outputs data received from Google Geo API.
    console.log(results.address);

    // Calls getWeather function in watcher.js
    weather.getWeather(results.latitude, results.longtitude, (errorMessage, weatherResults) => {
      // Output error message from DarkSky API.
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        // Outputs data received from DarkSky API.
        console.log('It is currently ' + weatherResults.temperature + '. It feels like ' + weatherResults.apparentTemperature + '.');
      }
    });
  }
});
