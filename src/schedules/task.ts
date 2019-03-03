export default {
  cron: '*/5 * * * * *',
  run(fireDate: Date) {
    console.log('run task at:', fireDate.toString());
  },
};
