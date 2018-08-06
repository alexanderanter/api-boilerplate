process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('Ping', () => {
  describe('GET /ping', () => {
    it('it should respond with Pong!', done => {
      chai
        .request(app)
        .get('/ping')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('pong');
          done();
        });
    });
  });
});
