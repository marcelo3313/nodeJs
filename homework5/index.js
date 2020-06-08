const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const flash = require('express-flash');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const {User} = require('./user-validation/user-validation');
const {getUsers, writeUsers} = require('./database/data-util');
const app = express();
const {initPassport} = require('./passport/passport-init');
const {checkAuthentification, checkLogin} = require('./passport/passport-check');

initPassport(passport);

app.use(express.static(`${__dirname}/assets`));
app.use(flash());
app.set('view engine', 'hbs');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', checkAuthentification, (req, res) => {
  res.render('index.hbs', {user: req.user});
});

app.get('/login', checkLogin, (req, res) => {
  res.render('login.hbs');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

app.get('/register', checkLogin, (req, res) => {
  res.render('register.hbs');
});

app.post('/register', async (req, res) => {
  const {value, error} = User.validate({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  if (!error) {
    const users = await getUsers();
    users.push(value);
    await writeUsers(users);
    res.redirect('/login');
  } else {
    req.flash('error', error.message);
    res.redirect('/register');
  }
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

app.listen(3000);