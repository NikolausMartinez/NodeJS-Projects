const express = require('express');
const hbs = require('hbs');

// Make the express app
var app = express();

// Tell express to the the hbs view engine  for handlebars
app.set('view engine', 'hbs');

// hbs tells handlebars to use partials
hbs.registerPartials(__dirname + '/views/partials'); // __dirname stores the path to your projects directory

// hbs tells handlebars to use this helpers for getCurrentYear.
// This helps you reduce repeated code. You use these in your partials.
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

// Add middleware
app.use(express.static(__dirname + '/public')); // __dirname stores the path to your projects directory

// Creating a home route
app.get('/', (req, res) => {  // request , response

  // Go to the home template
  // res.render is used with the hbs view engine to view templates
  res.render('home.hbs', {

    // Dynamic data you can send to templates
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

// Creating an about route this returns a html
app.get('/about', (req, res) => {

  // Go to the about template
  res.render('about.hbs', {

    // Dynamic data you can send to templates
    pageTitle: 'About Page'
  });
})

// Creating a error route
app.get('/error', (req, res) => {
  // res.send is basic express to go to templates
  res.send({
    errorMessage: 'Unable to handle request'
  });
})

// Bind the application to a port on our machine
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
