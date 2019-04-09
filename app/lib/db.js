const mongoose = require('mongoose');
const config = require('config');

const { MONGOOSE } = require('../constants/CONFIG');

const { uri, options } = config.get(MONGOOSE);

let connection = null;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
  /**
   * Establishes connection to the database
   * Adds dbConnection to the context
   * @param {*} ctx
   * @param {*} next
   */
  connect: async () => {
    try {
      if (!connection) {
        connection = await mongoose.connect(
          uri,
          {
            useNewUrlParser: true,
            ...options,
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
  connection,
  disconnect: async () => {
    const { connections } = mongoose;
    await connections.forEach(conn => conn.close());
    await mongoose.disconnect();
  },
};
