'use strict';

const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;


module.exports = (app, options) => {
  const bearerStrategy = new BearerStrategy(options,
    (token, done) => {
      // Send user info using the second argument
      done(null, {}, token);
    },
  );

  app.use(passport.initialize());
  passport.use(bearerStrategy);

  return passport.authenticate('oauth-bearer', { session: false });
};
