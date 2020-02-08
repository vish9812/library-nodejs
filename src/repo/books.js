const { ObjectID } = require('mongodb');

const mongo = require('./mongo');

const collection = 'books';

function findBook(id) {
  return mongo.usingCollection(collection, (col) => col.findOne({ _id: new ObjectID(id) }));
}

function fetchBooks() {
  return mongo.usingCollection(collection, (col) => col.find().toArray());
}

function addBooks(books) {
  return mongo.usingCollection(collection, (col) => col.insertMany(books));
}

module.exports = {
  findBook,
  fetchBooks,
  addBooks,
};
