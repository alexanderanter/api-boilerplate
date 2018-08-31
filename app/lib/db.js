const mongoose = require('mongoose');
const config = require('config');

const { MONGOOSE } = require('../constants/CONFIG');

const { uri, options } = config.get(MONGOOSE);

let connection = null;

module.exports = {
  /**
   * Establishes connection to the database
   * Adds dbConnection to the context
   * @param {*} ctx
   * @param {*} next
   */
  connect: async () => {
    connection = await mongoose.connect(
      uri,
      options,
    );
  },
  connection,
  disconnect: async () => {
    const { connections } = mongoose;
    await connections.forEach(conn => conn.close());
    await mongoose.disconnect();
  },
};
