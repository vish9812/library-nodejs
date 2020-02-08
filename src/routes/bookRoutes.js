const express = require('express');
const debug = require('debug')('app:bookRoutes');

const booksRepo = require('../repo/books');

const router = express.Router();

function routeHandler(data) {
  router.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  router.route('/')
    .get(async (req, res) => {
      const books = await booksRepo.fetchBooks();

      res.render(
        'bookListView',
        {
          nav: data.nav,
          title: data.title,
          books,
        },
      );
    });

  router.route('/:id')
    .all(async (req, res, next) => {
      const { id } = req.params;

      const book = await booksRepo.findBook(id);

      debug('Setting the book in req object');

      req.book = book;

      next();
    })
    .get(async (req, res) => {
      res.render(
        'bookView',
        {
          nav: data.nav,
          title: data.title,
          book: req.book,
        },
      );
    });

  return router;
}

module.exports = routeHandler;
