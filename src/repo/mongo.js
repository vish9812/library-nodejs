const { MongoClient } = require('mongodb');
const debug = require('debug')('app:mongo');

async function usingDb(callback) {
  const server = process.env.mongo_server;
  const dbName = 'library';

  let client;
  try {
    client = await MongoClient.connect(server);

    debug('Connected to Mongo!!');

    const db = client.db(dbName);

    debug('executing DB callback');
    return await callback(db);
  } catch (err) {
    debug(err);
  } finally {
    if (client) {
      debug('Closing Mongo Connection!!');
      client.close();
    }
  }

  return null;
}

function usingCollection(name, callback) {
  return usingDb(async (db) => {
    const col = await db.collection(name);
    debug('executing Collection callback');
    return callback(col);
  });
}

module.exports = {
  usingDb,
  usingCollection,
};
