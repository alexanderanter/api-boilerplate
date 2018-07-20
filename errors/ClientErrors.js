const statuses = require('statuses');

const BadRequest = {
  status: 400,
  message: statuses[400],
};

const Unauthorized = {
  status: 401,
  message: statuses[401],
};

const Forbidden = {
  status: 403,
  message: statuses[403],
};

module.exports = {
  BadRequest,
  Unauthorized,
  Forbidden,
};
