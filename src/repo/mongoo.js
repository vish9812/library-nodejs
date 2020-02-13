const mongoose = require('mongoose');
const debug = require('debug')('app:mongoo');

async function usingDb(callback) {
  const server = process.env.mongo_server;
  const dbName = 'library';

  let db;
  try {
    await mongoose.connect(`${server}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

    debug('Connection Opened!!');

    db = mongoose.connection;

    debug('executing DB callback');
    return await callback(db);
  } catch (err) {
    debug('Error in Mongoose!!', err);
  } finally {
    if (db) {
      debug('Closing Connection!!');
      db.close();
    }
  }

  return null;
}

async function usingModel(name, schemaDefinition, callback) {
  return usingDb(() => {
    debug(`Creating schema for ${name}`);

    const schema = new mongoose.Schema(schemaDefinition);

    debug(`Creating model for ${name}`);

    const model = mongoose.modelNames().some((n) => n === name)
      ? mongoose.model(name)
      : mongoose.model(name, schema);

    return callback(model);
  });
}

module.exports = {
  usingDb,
  usingModel,
};
