const mongoose = require('mongoose');
const config = require('config');

const { MONGOOSE } = require('../constants/CONFIGS');

const { uri, options } = config.get(MONGOOSE);

let connection = null;

module.exports = {
  /**
   * Establishes connection to the database
   * Adds dbConnection to the context
   * @param {*} ctx
   * @param {*} next
   */
  connect: () => async (ctx, next) => {
    connection = await mongoose.connect(
      uri,
      options,
    );
    ctx.mongoose = mongoose;
    ctx.dbConnection = connection;
    await next();
  },
  disconnect: async () => {
    const { connections } = mongoose;
    await connections.forEach(conn => conn.close());
    await mongoose.disconnect();
  },
};
