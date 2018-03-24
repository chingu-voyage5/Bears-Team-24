const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URL}/auth/github/callback`,
    },
    /* eslint-disable func-names, prefer-arrow-callback */
    function(accessToken, refreshToken, profile, done) {
      const searchQuery = {
        'github.id': profile.id,
      };
      const update = {
        'github.id': profile.id,
        username: profile.username,
        // eslint-disable-next-line no-underscore-dangle
        email: profile._json.email,
      };
      const updateOptions = {
        upsert: true,
      };
      User.findOneAndUpdate(searchQuery, update, updateOptions, function(
        err,
        user
      ) {
        return done(err, user);
      });
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  )
);
