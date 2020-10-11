const LocalStrategy = require('passport-local').Strategy;
const {getUsers} = require('../database/data-util');

async function initPassport(passport) {
  passport.use(new LocalStrategy({}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser(async (username, done) => done(null, await getUser(username)));
}

async function authenticateUser(username, password, done) {
  const user = await getUser(username);

  if (!user) {
    return done(null, false, {message: 'There is no user with that username'});
  }

  if (user.password === password) {
    return done(null, user)
  } else {
    return done(null, false, {message: 'Password is incorrect'});
  }
}

async function getUser(username) {
  const users = await getUsers();
  return (users || []).find((user) => (user || {}).username === username);
}

module.exports = {
  initPassport,
};
