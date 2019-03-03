/**
 * The 4xx class of status code is intended for cases in which the client
 * seems to have erred. Except when responding to a HEAD request, the
 * server SHOULD include an entity containing an explanation of the error
 * situation, and whether it is a temporary or permanent condition. These
 * status codes are applicable to any request method. User agents SHOULD
 * display any included entity to the user.
 *
 *  If the client is sending data, a server implementation using TCP
 * SHOULD be careful to ensure that the client acknowledges receipt of
 * the packet(s) containing the response, before the server closes the
 * input connection. If the client continues sending data to the server
 * after the close, the server's TCP stack will send a reset packet to
 * the client, which may erase the client's unacknowledged input buffers
 * before they can be read and interpreted by the HTTP application.
 */

/**
 * The request could not be understood by the server due to malformed
 * syntax. The client SHOULD NOT repeat the request without modifications.
 */
export class BadRequest extends Error {
  public status: number;

  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, BadRequest);
    this.status = 400;
    this.message =
      'The request could not be understood by the server due to malformed syntax.';
  }
}

/**
 * The request requires user authentication. The response MUST include a
 * WWW-Authenticate header field (section 14.47) containing a challenge
 * applicable to the requested resource. The client MAY repeat the
 * request with a suitable Authorization header field (section 14.8). If
 * the request already included Authorization credentials, then the 401
 * response indicates that authorization has been refused for those
 * credentials. If the 401 response contains the same challenge as the
 * prior response, and the user agent has already attempted
 * authentication at least once, then the user SHOULD be presented the
 * entity that was given in the response, since that entity might include
 * relevant diagnostic information. HTTP access authentication is
 * explained in "HTTP Authentication: Basic and Digest Access
 * Authentication" [43].
 */
export class Unauthorized extends Error {
  public status: number;

  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, Unauthorized);
    this.status = 401;
    this.message = 'The request requires user authentication.';
  }
}

/**
 * The server understood the request, but is refusing to fulfill it.
 * Authorization will not help and the request SHOULD NOT be repeated. If
 * the request method was not HEAD and the server wishes to make public
 * why the request has not been fulfilled, it SHOULD describe the reason
 * for the refusal in the entity. If the server does not wish to make
 * this information available to the client, the status code 404 (Not
 * Found) can be used instead.
 */
export class Forbidden extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, Forbidden);
    this.status = 403;
    this.message =
      'The server understood the request, but is refusing to fulfill it. Authorization will not help and the request should not be repeated.';
  }
}

/**
 * The server has not found anything matching the Request-URI. No
 * indication is given of whether the condition is temporary or
 * permanent. The 410 (Gone) status code SHOULD be used if the server
 * knows, through some internally configurable mechanism, that an old
 * resource is permanently unavailable and has no forwarding address.
 * This status code is commonly used when the server does not wish to
 * reveal exactly why the request has been refused, or when no other
 * response is applicable.
 */
export class NotFound extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, NotFound);
    this.status = 404;
    this.message =
      'The server has not found anything matching the Request-URI.';
  }
}

/**
 * The method specified in the Request-Line is not allowed for the
 * resource identified by the Request-URI. The response MUST include an
 * Allow header containing a list of valid methods for the requested
 * resource.
 */
export class MethodNotAllowed extends Error {
  public status: number;
  public headers: any[];
  /**
   * Throws MethodNotAllowed error
   * args must contain array of allowed methods for the resource
   * @param {Array} methods example ['GET', 'POST']
   */
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, MethodNotAllowed);
    this.status = 405;
    console.log(args);
    const [methods] = args;
    this.headers = [{ name: 'Allow', text: methods.join(', ') }];
    this.message =
      'The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.';
  }
}

/**
 * The client did not produce a request within the time that the server
 * was prepared to wait. The client MAY repeat the request without
 * modifications at any later time.
 */
export class RequestTimeout extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, RequestTimeout);
    this.status = 408;
    this.message =
      'The client did not produce a request within the time that the server was prepared to wait.';
  }
}

/**
 * This code is only allowed in situations where it is expected that
 * the user might be able to resolve the conflict and resubmit
 * the request. The response body SHOULD include enough
 *
 * information for the user to recognize the source of the conflict.
 *  Ideally, the response entity would include enough information for
 * the user or user agent to fix the problem;
 * however, that might not be possible and is not required.
 *
 * Conflicts are most likely to occur in response to a PUT request.
 * For example, if versioning were being used and the entity being PUT
 * included changes to a resource which conflict with those made
 * by an earlier (third-party) request, the server might use the 409
 * response to indicate that it can't complete the request. In this case,
 * the response entity would likely contain a list of the differences
 * between the two versions in a format defined by the response
 * Content-Type.
 */
export class Conflict extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, Conflict);
    this.status = 409;
    this.message =
      'The request could not be completed due to a conflict with the current state of the resource.';
  }
}

/**
 * The requested resource is no longer available at the server and no
 * forwarding address is known. This condition is expected to be
 * considered permanent. Clients with link editing capabilities SHOULD
 * delete references to the Request-URI after user approval. If the
 * server does not know, or has no facility to determine, whether or not
 * the condition is permanent, the status code 404 (Not Found) SHOULD be
 * used instead. This response is cacheable unless indicated otherwise.
 *
 * The 410 response is primarily intended to assist the task of web
 * maintenance by notifying the recipient that the resource is
 * intentionally unavailable and that the server owners desire that
 * remote links to that resource be removed. Such an event is common for
 * limited-time, promotional services and for resources belonging to
 * individuals no longer working at the server's site. It is not
 * necessary to mark all permanently unavailable resources as "gone" or
 * to keep the mark for any length of time -- that is left to the
 * discretion of the server owner.
 */
export class Gone extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, Gone);
    this.status = 410;
    this.message =
      'The requested resource is no longer available at the server and no forwarding address is known.';
  }
}

/**
 * The server is refusing to service the request because the entity of
 * the request is in a format not supported by the requested resource for
 * the requested method.
 */
export class UnsupportedMediaType extends Error {
  public status: number;
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, UnsupportedMediaType);
    this.status = 415;
    this.message =
      'The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method.';
  }
}

export default {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  RequestTimeout,
  Conflict,
  Gone,
  UnsupportedMediaType,
};
