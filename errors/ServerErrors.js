class NotImplemented extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NotImplemented);
    this.status = 501;
    this.message = 'Not implemented.';
  }
}

class BadGateway extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, BadGateway);
    this.status = 502;
    this.message = 'Invalid response from upstream server.';
  }
}

class GatewayTimeout extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, GatewayTimeout);
    this.status = 504;
    this.message = 'Upstream server took too long to respond.';
  }
}

module.exports = {
  NotImplemented,
  BadGateway,
  GatewayTimeout,
}