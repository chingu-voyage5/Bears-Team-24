/* eslint-disable no-underscore-dangle */
const { expect } = require('chai');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = require('./user');

describe('User model', () => {
  let _id;
  let testUser;
  let error;
  const testPassword = 'test';

  beforeEach(async () => {
    _id = mongoose.Types.ObjectId();
    error = 'none';
    testUser = {
      _id,
      email: 'test@email.com',
      username: 'test',
    };
  });
  afterEach(async () => {
    await User.remove({ _id });
  });
  describe('insert', () => {
    it('should insert a new user', async () => {
      const user = new User(testUser);
      await user.save();
      const userInDb = await User.findById(_id);
      expect(userInDb._id).to.eql(testUser._id);
      expect(userInDb.username).to.eql(testUser.username);
      expect(userInDb.email).to.eql(testUser.email);
    });
    it('should register a new user', async () => {
      const user = new User(testUser);
      const register = promisify(User.register, User);
      try {
        await register(user, testPassword);
      } catch (e) {
        error = e.name;
      }
      const userInDb = await User.findById(_id);
      expect(userInDb._id).to.eql(testUser._id);
      expect(userInDb.username).to.eql(testUser.username);
      expect(userInDb.email).to.eql(testUser.email);
      expect(error).to.equal('none');
    });
    it('should reject duplicate username on registration', async () => {
      const user1 = new User(testUser);
      const user2 = new User(testUser);
      const register = promisify(User.register, User);
      try {
        await register(user1, testPassword);
        await register(user2, testPassword);
      } catch (e) {
        error = e.name;
      }
      const user1InDb = await User.findById(_id);
      expect(user1InDb._id).to.eql(testUser._id);
      expect(error).to.equal('UserExistsError');
    });
  });
});
