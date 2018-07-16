FROM node:8

WORKDIR /app/src
COPY package.json /app
COPY package-lock.json /app
RUN npm install
RUN npm i -g nodemon
RUN npm i -g babel-cli
COPY . /app

EXPOSE 8080
ENV NODE_ENV development
CMD ["npm", "start"]
