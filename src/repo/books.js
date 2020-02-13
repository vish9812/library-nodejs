const debug = require('debug')('app:repo-book');

const mongo = require('./mongo');
const mongoo = require('./mongoo');
const bookModel = require('../models/book');

const collection = 'books';
const modelName = 'Book';

function findBook(id) {
  return mongoo.usingModel(modelName, bookModel, (Book) => Book.findById(id).lean());
}

async function fetchBooks() {
  debug('Fetch books called');
  const myBooks = await mongoo.usingModel(modelName, bookModel, async (Book) => {
    debug('Finding Books');

    const books = await Book.find({});

    debug('Got books');

    return books;
  });

  debug('exiting fetchBooks');

  return myBooks;
}

function addBooks(books) {
  return mongo.usingCollection(collection, (col) => col.insertMany(books));
}

module.exports = {
  findBook,
  fetchBooks,
  addBooks,
};
