/* eslint-disable no-underscore-dangle */
const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const User = require('../../models/user');

// const should = chai.should();
const { expect } = chai;

chai.use(chaiHttp);

describe('User routes', () => {
  let _id;
  let ids;
  let testUser;
  let testUsers;

  beforeEach(async () => {
    await User.remove({});
    ids = [];
    testUsers = [];
    _id = mongoose.Types.ObjectId();
    ids.push(_id);
    testUser = {
      _id,
      email: 'test1@email.com',
      username: 'test1',
    };
    testUsers.push(testUser);
    let user = new User(testUser);
    await user.save();
    _id = mongoose.Types.ObjectId();
    ids.push(_id);
    testUser = {
      _id,
      email: 'test2@email.com',
      username: 'test2',
    };
    testUsers.push(testUser);
    user = new User(testUser);
    await user.save();
  });
  afterEach(async () => {
    await User.remove({ _id: { $in: ids } });
  });
  it('gets user detail', done => {
    chai
      .request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        if (err) throw err;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.equal(2);
        res.body.forEach(user => {
          // eslint-disable-next-line eqeqeq
          const eu = testUsers.filter(u => u._id == user._id)[0];
          expect(eu).to.be.a('object');
          expect(user.username).to.equal(eu.username);
          expect(user.email).to.equal(eu.email);
        });
        done();
      });
  });
});
