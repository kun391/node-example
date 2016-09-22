// App
const query = require('./lib/builders/query');

// find user has id is 57e251e1d08c1dbfdf220a07
let user = query.findById('57e251e1d08c1dbfdf220a07');
console.log(user);
// get all users
let users = query.findAll();
console.log(users);
