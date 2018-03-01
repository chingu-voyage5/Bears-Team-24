/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const app = require('../../app');
const { expect } = require('chai');
const mongoose = require('mongoose');
const User = require('../../models/user');

describe('User routes', () => {
  let _id;
  let testUser;

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
  it('gets user detail', () => {
    request(app)
      .get(`/api/v1/user/${testUser._id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res._id).to.equal(testUser._id);
        expect(res.username).to.equal(testUser.username);
        expect(res.email).to.equal(testUser.email);
      });
  });
});
