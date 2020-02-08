const authController = require('./authController');
const booksRepo = require('../repo/books');
const bookService = require('../services/goodreadsService');

function bookController(data) {
  function authMiddleware(req, res, next) {
    authController(data).authMiddleware(req, res, next);
  }

  async function getAll(req, res) {
    const books = await booksRepo.fetchBooks();

    res.render(
      'bookListView',
      {
        nav: data.nav,
        title: data.title,
        books,
      },
    );
  }

  async function getById(req, res) {
    const { id } = req.params;

    const book = await booksRepo.findBook(id);

    book.details = await bookService.getBookById(book.id);

    res.render(
      'bookView',
      {
        nav: data.nav,
        title: data.title,
        book,
      },
    );
  }

  return {
    authMiddleware,
    getAll,
    getById,
  };
}

module.exports = bookController;
