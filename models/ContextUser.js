class ContextUser {
  constructor({
    email,
    firstName = null,
    lastName = null,
    picture = null,
    provider = null,
    providerId = null,
    _id = null,
    token = null,
  }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
    this.provider = provider;
    this.providerId = providerId;
    this.token = token;
    this._id = _id;
  }

  getAsObject() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      picture: this.picture,
      provider: this.provider,
      providerId: this.providerId,
    };
  }

  getForDB() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      picture: this.picture,
      provider: this.provider,
      providerId: this.providerId,
      token: this.token,
    };
  }

  getForJWT() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      picture: this.picture,
      provider: this.provider,
      providerId: this.providerId,
      _id: this._id,
    };
  }
}

module.exports = ContextUser;
