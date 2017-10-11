const yargs = require('yargs');
const geoCode = require('./geoCode/geoCode');

// The object that stores the final parsed input from user
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true // Tells yargs to always parse the address as a string
    }
})
  .help()
  .alias('help', 'h') // Make alias for help
  .argv;

// Call the geoCode function in geoCode.js
geoCode.geoCodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // JSON.stringify shows all the properties in a object
    // the second argument is to filter out properties. Don't want that so set it to undefined
    // third argument formats the JSON. 2 spaces for indentation.
    //console.log(JSON.stringify(body, undefined, 2))
    console.log(JSON.stringify(results, undefined, 2));
  }
});
