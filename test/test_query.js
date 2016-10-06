var assert = require('chai').assert;
var sinon = require('sinon');
const query = require('../lib/builders/query');
const file = 'lib/database/user.json';

describe('function readData working ok', () => {
  it('return have ten records', (done) => {
    query.readData(file, (data) => {
      assert.isArray(data);
      assert.equal(10, data.length);
    });
    done();
  });
  it('return exception when the path of file is wrong', (done) => {
    try {
      query.readData('../users.jon');
    } catch (e) {
      if (e instanceof Error) {
        assert.instanceOf(e, Error);
        done();
      }
    }
  });
});

describe('function findById working ok', () => {
  it('return have one record', (done) => {
    // {
    //   "_id": "57e251e1d08c1dbfdf220a07",
    //   "index": 0,
    //   "guid": "f2081196-2765-4d0a-90bb-6b669c2b5d1e",
    //   "isActive": false,
    //   "balance": "$3,237.71",
    //   "picture": "http://placehold.it/32x32",
    //   "age": 37,
    //   "eyeColor": "blue",
    //   "name": {
    //     "first": "Alexis",
    //     "last": "Goodwin"
    //   }
    // }
    let user = query.findById('57e251e1d08c1dbfdf220a07');
    assert.typeOf({
      user: 'chai'
    }, 'object');
    assert.equal(user._id, '57e251e1d08c1dbfdf220a07');
    assert.equal(user.name.first, 'Alexis');
    assert.equal(user.name.last, 'Goodwin');
    done();
  });
  it('return no data', (done) => {
    let user = query.findById('nodata');
    assert.typeOf({
      user: 'chai'
    }, 'object');
    assert.equal(user, null);
    done();
  });
  it('return no data with hasOwnProperty false', (done) => {
    let x = {}.hasOwnProperty;
    sinon.stub(x, 'call', () => {
      return false;
    });
    let user = query.findById('57e251e1d08c1dbfdf220a07');
    assert.typeOf({
      user: 'chai'
    }, 'object');
    assert.equal(user, null);
    x.call.restore();
    done();
  });
});

describe('function findById working ok', () => {
  it('return have ten records', (done) => {
    let users = query.findAll();
    assert.typeOf(users, 'array');
    assert.equal(10, users.length);
    done();
  });
  it('return no data', (done) => {
    sinon.stub(query, 'readData', () => {
      return [];
    });
    let users = query.findAll();
    assert.typeOf(users, 'array');
    assert.equal(0, users.length);
    done();
  });
});
