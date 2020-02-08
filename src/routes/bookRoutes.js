const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

function routeHandler(data) {
  const { authMiddleware, getAll, getById } = bookController(data);

  router.use(authMiddleware);

  router.route('/')
    .get(getAll);

  router.route('/:id')
    .get(getById);

  return router;
}

module.exports = routeHandler;
