const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
// test
const counterTest = require('../test/counterTest.txt');

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// pass in callback from index???
exports.getNextUniqueId = (callback) => {
  // call readCounter, pass in a callback
  readCounter((err, num) => {
    // return numberfied string
    counter = num;
  })
    // callback should take in two values, error? and a stringified number
      // stringified number comes from saved file's text -- not quite surehow to get it
      // set counter in this file to numberfied

  writeCounter(counter + 1, (null, str) => {
    fs.writeFile(counterFile, str);
  });

  return zeroPaddedNumber(counter);
};

//fs.existsSync()


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
// not quite understanding path.join? what is it doing?
// /Users/parkerjn90/HackReactor/Sprints/rfe2204-cruddy-todo/datastore + /counter.txt