const { MongoClient } = require('mongodb');
const debug = require('debug')('app:mongo');

async function useMongo(callback) {
  const server = process.env.mongo_server;
  const dbName = 'library';

  let client;
  try {
    client = await MongoClient.connect(server);

    debug('Connected to Mongo!!');

    const db = client.db(dbName);

    return await callback(db);
  } finally {
    if (client) {
      debug('Closing Mongo Connection!!');
      client.close();
    }
  }
}

module.exports = useMongo;
