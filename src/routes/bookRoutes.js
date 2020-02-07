const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

const router = express.Router();

function routeHandler(data) {
  router.route('/')
    .get(async (req, res) => {
      const books = (await sql.query`select id, title, author from Books`).recordset;

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
      const book = (await sql.query`select id, title, author from Books where Id = ${id}`).recordset[0];

      debug(book);

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
