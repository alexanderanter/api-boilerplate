const schedule = require('node-schedule');
const { load } = require('./util');

const initSchedules = (app, schedules) => {
  Object.values(schedules).forEach(item => {
    if (item.cron && typeof item.run === 'function') {
      schedule.scheduleJob(item.cron, item.run.bind(app));
    }
  });
};

/**
 * Initializes the app and attaches controllers, models, services and constants to the context
 *
 * @param {*} app
 */
module.exports = function init(app) {
  app.controllers = load('controllers');
  app.models = load('models');
  app.errors = load('errors');
  app.services = load('services');
  app.constants = load('constants');
  // init schedules
  const schedules = load('schedules');
  initSchedules(app, schedules);
  const { context } = app;
  context.models = app.models;
  context.errors = app.errors;
  context.services = app.services;
  context.constants = app.constants;
};
