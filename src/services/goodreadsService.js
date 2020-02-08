const axios = require('axios').default;
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  async function getBookById(id) {
    const bookId = id || 656;
    debug(`Fetching Book Details${id}`);

    try {
      const xmlResponse = await axios.get(`https://www.goodreads.com/book/show/${bookId}.xml?key=${process.env.goodreads_key}`);

      debug('Got response');

      const result = await parser.parseStringPromise(xmlResponse.data);

      debug('parsed book');

      debug(`result.GoodreadsResponse.book.id${result.GoodreadsResponse.book.id}`);

      return result.GoodreadsResponse.book;
    } catch (err) {
      debug('parsing error', err);
    }

    return null;
  }

  return {
    getBookById,
  };
}

module.exports = goodreadsService();
