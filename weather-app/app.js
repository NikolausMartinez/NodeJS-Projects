const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=2294%20white%20ash%20ct%20st.louis',
    // tells request to take json and convert it into an object
    json: true
}, (error, response, body) => {
    // JSON.stringify shows all the properties in the object body
    // the second argument is to filter out properties. Don't want that so set it to undefined
    // third argument formats the json 2 spaces for indentation
    console.log(JSON.stringify(body, undefined, 2));
});