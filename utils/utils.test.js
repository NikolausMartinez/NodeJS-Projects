// Stores test cases

const utils = require('./utils');

// it() is Behavior driven testing with mocha
it('Should add two numbers', () => {
  // Call the function were testing.
  var res = utils.add(33, 11);

  // Throw error if result is wrong.
  if (res !== 44) {
    throw new Error('Expected 44 but got ' + res);
  };
});

it('Should square the number', () => {
  // Call the function were testing.
  var res = utils.square(5, 5);

  // Throw error if result is wrong.
  if (res !== 25){
    throw new Error('Expected 25 but got ' + res);
  };
});
