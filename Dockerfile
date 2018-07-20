FROM node:8

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
RUN npm i -g nodemon
COPY . /app

EXPOSE 8080
ENV NODE_ENV development
CMD ["npm", "start"]
