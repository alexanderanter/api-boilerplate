process.env.NODE_ENV = 'testing';

const request = require('supertest');
const app = require('../index');

describe('Test Ping route', async () => {
  it('GET /ping should respond with Pong!', async done => {
    const res = await request(app.callback()).get('/ping');
    expect(res).toBeDefined();
    expect(res.status).toEqual(200);
    expect(JSON.parse(res.text)).toEqual({ message: 'Pong!' });
    done();
  });

  afterAll(async () => {
    const { mongoose, dbConn } = app;
    await mongoose.connection.close();
    await dbConn.close();
    await mongoose.disconnect();
  });
});
