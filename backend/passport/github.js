const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');

passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
  },
  /* eslint-disable func-names, prefer-arrow-callback */
  function (accessToken, refreshToken, profile, done) {
    const searchQuery = {
      githubId: profile.id
    };
    const update = {
      githubId: profile.id,
      username: profile.displayName,
      email: profile.email
    };
    const updateOptions = {
      upsert: true
    };
    User.findOneAndUpdate(searchQuery, update, updateOptions, function (err, user) {
      return done(err, user);
    });
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));
