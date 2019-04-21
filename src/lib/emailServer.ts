import config from 'config';
const emailjs = require('emailjs');

import { EMAIL_SERVER } from '../constants/CONFIG';

let connection: any = null;

export default {
  /**
   * Connects to the email server
   */
  connect() {
    const { user, password, host, ssl } = config.get(EMAIL_SERVER);
    connection = emailjs.server.connect({
      user,
      password,
      host,
      ssl,
    });
  },
  /**
   * The current email server connection
   *
   */
  connection,
  /**
   * Sends an email message
   *
   * @param {String} subject
   * @param {String} text
   * @param {String} recipient
   * @param {*} attachment
   * @returns
   */
  send(subject: string, text: string, recipient: string, attachment: any) {
    return new Promise((resolve, reject) => {
      connection.send(
        {
          text,
          from: process.env.EMAIL_SERVER_USER,
          to: recipient,
          subject,
          attachment,
        },
        (err: Error, message: any) => {
          if (err) reject(err);
          resolve(message);
        },
      );
    });
  },
};
