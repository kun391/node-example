let fs = require('fs');
const file = './lib/database/user.json';

let readData = function readData(pathFile) {
  return JSON.parse(fs.readFileSync(pathFile, 'utf8'));
};

let find = function find(key, value) {
  let data = readData(file);
  for (let i in data) {
    if ({}.hasOwnProperty.call(data, i)) {
      let index = data[i][key];
      if (index === value.toString()) {
        return data[i];
      }
    }
  }
  return null;
};

let findById = function findById(id) {
  return find('_id', id);
};

let findAll = function findAll() {
  return exports.readData(file);
};

exports = module.exports = {
  readData,
  findById,
  findAll
};
