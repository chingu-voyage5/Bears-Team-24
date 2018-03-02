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
  let testUser;
  User.collection.drop();
  beforeEach(async () => {
    _id = mongoose.Types.ObjectId();
    testUser = {
      _id,
      email: 'test@email.com',
      username: 'test'
    };
    const user = new User(testUser);
    await user.save();
  });
  afterEach(async () => {
    await User.remove({ _id });
  });
  it('gets user detail', (done) => {
    chai.request(app)
      .get(`/api/v1/user/${testUser._id}`)
      .end((err, res) => {
        if (err) throw err;
        expect(res.statusCode).to.equal(200);
        expect(res.body._id).to.equal(testUser._id.toHexString());
        expect(res.body.username).to.equal(testUser.username);
        expect(res.body.email).to.equal(testUser.email);
        done();
      });
  });
});
