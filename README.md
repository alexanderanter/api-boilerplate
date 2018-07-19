# KoaJS REST API

> RefToken Koa API Boilerplate

## First Time Usage

### 1. Clone the repo

```bash
git clone https://github.com/reftoken/api-boilerplate.git
```

### 2. Add secrets

This step requires you to go to the dev consoles of the integrated social sign in strategies (currently [facebook](https://developers.facebook.com) and [google](https://console.developers.google.com/)).

Get the clientID (appId for facebook) and the client secrets of each project. Create a .env file in the /src folder (see .env.example) and you're all set.

### 3. Build docker container

```bash
docker-compose build
```

NB! There is currently a bug in the docker config which means you also need to run `npm install` from outside the docker container.

### 4. Start the docker container

```bash
docker-compose up
```

## Benefits

This API uses the KoaJS framwork. Koa's greatness comes from its use of async/await pattern and staying up to date with the latest ECMAScript specifications.

Another benefit of this API is the babel transpiler which allows you to write beautiful code using ES6 Modules, thereby future proofing your applications (maybe, or maybe not - more on that [here](https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71)). It also means that syntax can be uniform across the API and frontend clients using babel to transpile the latest ES language features.

All routes and controllers are dynamically added, so you don't need to remember to add new routes to the router, or controllers to the app. It's handled automagically. Here comes a crux though, since dynamic module loading is not part of import/export specification ([yet](https://github.com/tc39/proposal-dynamic-import)), all routes and controllers currently need to use the regular module.exports pattern since they are imported using require with initalisation on import. When dynamic imports become a part of the standard it will also be added in this boilerplate.

The application runs inside a docker container (supplied) and uses its own database (mongodb) which means you can set up this for development on any system (almost sorry most Windows users, but it's probably time you change your OS anyway).

The API comes ready to handle social sign in strategies by Facebook and Google, and an email strategy in which the API sends a session link to the email a user provides. In the future, the API will also be able to use blockchain based authentication providers to sign in. The first planned integration is [uPort](https://www.uport.me/). We're also interested in [Civic](https://www.civic.com/) and [Blockstack ID](https://blockstack.org/).

### Signin straties

- [x] Google
- [x] Facebook
- [ ] Passwordless email
- [ ] uPort
- [ ] Civic
- [ ] Blockstack
