/**
 * Used as a template for the User on the koa context
 *
 * @class ContextUser
 */
class ContextUser {
  /**
   *Creates an instance of ContextUser.
   * @param {*} {
   *     email,
   *     firstName = null,
   *     lastName = null,
   *     picture = null,
   *     provider = null,
   *     _id = null,
   *     token = null,
   *   }
   * @memberof ContextUser
   */
  constructor({
    email,
    firstName = null,
    lastName = null,
    picture = null,
    provider = null,
    _id = null,
    token = null,
  }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
    this.provider = provider;
    this.token = token;
    this._id = _id;
  }

  /**
   *
   * @returns the context user as a regular JS object
   * @memberof ContextUser
   */
  getAsObject() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      picture: this.picture,
      provider: this.provider,
    };
  }

  /**
   *
   * @returns the context user in a format expected by the database
   * @memberof ContextUser
   */
  getForDB() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      picture: this.picture,
      provider: this.provider,
      token: this.token,
    };
  }

  /**
   *
   * @returns the context user for encoding as JWT
   * @memberof ContextUser
   */
  getForJWT() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      picture: this.picture,
      _id: this._id,
    };
  }
}

module.exports = ContextUser;
