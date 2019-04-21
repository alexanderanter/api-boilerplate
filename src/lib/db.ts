import mongoose from 'mongoose';
import config from 'config';

const { uri, options } = config.get('mongoose');

let connection: mongoose.Connection = null;

export default {
  /**
   * Establishes connection to the database
   * Adds dbConnection to the context
   */
  connect: async () => {
    try {
      if (!connection) {
        connection = await mongoose.connect(uri, options);
      }
    } catch (error) {
      console.log(error);
    }
  },
  connection,
  disconnect: async () => {
    await mongoose.disconnect();
  },
  mongoose,
};
