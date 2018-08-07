const mongoose = require('mongoose');
const config = require('config');

const { NODE_ENV } = process.env;

const { MONGOOSE } = require('../constants/CONFIGS');
const { TEST } = require('../constants/ENV');

const { uri, options } = config.get(MONGOOSE);

module.exports = {
  /**
   * Establishes connection to the database
   * Adds dbConnection to the context
   * @param {*} app
   */
  connect: () => async (ctx, next) => {
    if (NODE_ENV === TEST) {
      ctx.dbConnection = null;
    } else {
      ctx.dbConnection = await mongoose.connect(
        uri,
        options,
      );
    }
    await next();
  },
};
