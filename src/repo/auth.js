const mongo = require('./mongo');

const collection = 'users';

function findUser(username) {
  return mongo.usingCollection(collection, (col) => col.findOne({ username }));
}

function saveUser(username, password) {
  return mongo.usingCollection(collection, async (col) => (await col.insertOne({ username, password })).ops[0]);
}

module.exports = {
  findUser,
  saveUser,
};
