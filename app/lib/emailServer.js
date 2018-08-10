const config = require('config');
const emailjs = require('emailjs');

let connection = null;

module.exports = {
  /**
   * Connects to the email server
   * @param {*} app
   */
  connect(app) {
    const { EMAIL_SERVER } = app.constants.CONFIG;
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
  send(subject, text, recipient, attachment) {
    return new Promise((resolve, reject) => {
      connection.send(
        {
          text,
          from: process.env.EMAIL_SERVER_USER,
          to: recipient,
          subject,
          attachment,
        },
        (err, message) => {
          if (err) reject(err);
          resolve(message);
        },
      );
    });
  },
};
