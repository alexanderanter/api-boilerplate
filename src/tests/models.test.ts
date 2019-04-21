import db from '../lib/db';
import User from '../models/User';

process.env.NODE_ENV = 'test';

interface iCTX {
  mongoose: any;
}

describe('Test routes endpoints', () => {
  beforeAll(async () => {
    try {
      await db.connect();
    } catch (error) {
      console.log(error);
    }
  });

  afterEach(async () => {
    try {
      db.disconnect();
    } catch (error) {
      console.log(error);
    }
  });

  it('Should create a new user', async done => {
    expect.assertions(1);
    const user = {
      firstName: 'Algot',
      lastName: 'Gregersson',
      email: 'algot@gregersson.com',
      picture: 'some/pic/I/found/one/day',
      provider: 'email',
    };
    const userModel = await new User(user);
    await userModel.save((err: any) => {
      if (err) throw err;
    });
    const foundUser = await User.findOne(user);
    expect(foundUser).toBeDefined();
    done();
  });
});
