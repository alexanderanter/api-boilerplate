# KoaJS REST API

> RefToken Koa API Boilerplate

## First Time Usage

### 1. Clone the repo

```bash
git clone https://github.com/reftoken/api-boilerplate.git
```

### 2. Config

This step requires you to go to the dev consoles of the integrated social sign in strategies (currently [facebook](https://developers.facebook.com) and [google](https://console.developers.google.com/)).

Get the clientID (appId for facebook) and the client secrets of each project. Create a .env file in the /src folder (see .env.example) and you're all set. The secrets are automatically loaded into the config files in the config folder.

For the email server to work you need to add the following info to the .env file:

```
EMAIL_SERVER_USER=email address to send from
EMAIL_SERVER_PASSWORD=the password for the email address
EMAIL_SERVER_TIMEOUT=for example 6000 (not used by default)
EMAIL_SERVER_HOST=for example: smtp.gmail.com
EMAIL_SERVER_TLS=TLS-GOES-HERE (not required)
```

This should enable the API to send emails.

### 3. Build docker container

```bash
docker-compose build
```

NB! There is currently a bug in the docker config which means you also need to run `npm install` from outside the docker container.

### 4. Start the docker container

```bash
docker-compose up
```

#### 5. Restart docker container

Getting docker to automatically restart and install any newly added node modules from the project on the host machine is a tricky venture. It's not working in this boilerplate at this stage. So if you install any new node modules make sure to shutdown the docker container, rebuild and restart before you start pulling your hair out.

```bash
docker-compose down
docker-compose up --build
```

## Benefits

This API uses the KoaJS framwork. Koa's greatness comes from its use of async/await pattern and staying up to date with the latest ECMAScript specifications.

All routes and controllers are dynamically added, so you don't need to remember to add new routes to the router, or controllers to the app. It's handled automagically.

The application runs inside a docker container (supplied) and uses its own database (mongodb) which means you can set up this for development on any system (almost sorry most Windows users, but it's probably time you change your OS anyway).

The API comes ready to handle social sign in strategies by Facebook and Google, and an email strategy in which the API sends a session link to the email a user provides. In the future, the API will also be able to use blockchain based authentication providers to sign in. The first planned integration is [uPort](https://www.uport.me/). We're also interested in [Civic](https://www.civic.com/) and [Blockstack ID](https://blockstack.org/).

### Signin straties

- [x] Google
- [x] Facebook
- [x] Email login link
- [ ] uPort
- [ ] Civic
- [ ] Blockstack
