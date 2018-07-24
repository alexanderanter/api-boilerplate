const config = require('config');
const emailjs = require('emailjs');

let connection = null;

module.exports = {
  connect() {
    const { user, password, timeout, host, tls, ssl } = config.get(
      'emailServer',
    );
    connection = emailjs.server.connect({
      user,
      password,
      host,
      ssl,
    });
  },
  connection,
  send(subject, text, recipient) {
    return new Promise((resolve, reject) => {
      connection.send(
        {
          text,
          from: process.env.EMAIL_SERVER_USER,
          to: recipient,
          subject,
        },
        (err, message) => {
          if (err) reject(err);
          resolve(message);
        },
      );
    });
  },
};
