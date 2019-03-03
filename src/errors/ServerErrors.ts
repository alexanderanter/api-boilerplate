export class InternalServerError extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, InternalServerError);
    this.status = 500;
    this.message =
      'The server encountered an unexpected condition which prevented it from fulfilling the request.';
  }
}

export class NotImplemented extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, NotImplemented);
    this.status = 501;
    this.message =
      'The server does not support the functionality required to fulfill the request.';
  }
}

export class BadGateway extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, BadGateway);
    this.status = 502;
    this.message = 'Invalid response from upstream server.';
  }
}

export class ServiceUnavailable extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, ServiceUnavailable);
    this.status = 503;
    this.message =
      'The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.';
  }
}

export class GatewayTimeout extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, GatewayTimeout);
    this.status = 504;
    this.message = 'Upstream server took too long to respond.';
  }
}

export default {
  InternalServerError,
  NotImplemented,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
};
