const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // items[id] = text;
  // callback(null, { id, text });
  counter.getNextUniqueId((err, id) => {
    if (err) {
      console.log('cannot get id');
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          console.log('cannot write');
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  // console.log(fs.readdir(exports.dataDir, ));

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      // create storage array
      let todoStorage = [];
      _.each(files, file => {
        let fileName = file.split('.')[0];
        // push file into array
        todoStorage.push({id: fileName, text: fileName});
      });
      // call callback on array?
      callback(null, todoStorage);
    }
  });

  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  // read files
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err, file) => {
    console.log(file);
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {id, text: file});
    }
  });
  // if error
    // log error
  // if not
    // invoke callback with null and an object? {id: fileName, text: }


  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err, file) => {
    console.log(file);
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          console.log('cannot write');
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), 'utf8', (err, file) => {
    console.log(file);
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.unlink(path.join(exports.dataDir, `${id}.txt`), (err) => {
        if (err) {
          console.log(new Error(`No item with id: ${id}`));
        } else {
          callback();
        }
      });
    }
  });
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
