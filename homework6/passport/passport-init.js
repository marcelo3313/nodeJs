const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {getUsers} = require('../database/data-util');
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: 'secretKey',
};

async function initPassport(passport) {
  passport.use(new JwtStrategy(jwtOptions, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser(async (username, done) => done(null, await getUser(username)));
}

async function authenticateUser(jwtPayload, done) {
  console.log(jwtPayload)
  const user = await getUser(jwtPayload.sub);

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
