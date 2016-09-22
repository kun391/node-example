var fs = require('fs');
var lodash = require('lodash');
const file = './lib/database/user.json';

exports.readData = function readData(pathFile) {
  return JSON.parse(fs.readFileSync(pathFile, 'utf8'));
};

exports.findById = function findById(id) {
  return lodash.find(this.readData(file), {_id: id});
};

exports.findAll = function findAll() {
  return this.readData(file);
};
