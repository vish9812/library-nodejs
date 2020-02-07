const express = require('express');
const debug = require('debug')('app:bookRoutes');
const { ObjectID } = require('mongodb');

const useMongo = require('../utility/data/mongo');

const router = express.Router();

function routeHandler(data) {
  router.route('/')
    .get(async (req, res) => {
      const books = await useMongo(async (db) => {
        const col = await db.collection('books');
        return col.find().toArray();
      });

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

      const book = await useMongo(async (db) => {
        const col = await db.collection('books');
        return col.findOne({ _id: new ObjectID(id) });
      });

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
