const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const { Users } = require('../db/models');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: '/auth/github/callback',
    },

    async (accessToken, refreshToken, profile, done) => {
      const response = await Users.findOrCreate({
        where: { githubId: profile.id, name: profile.displayName },
      });
      console.log('GitHubStrategy', response);
      return done(null, response[0]);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
