const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const flash = require('express-flash');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const {User} = require('./user-validation/user-validation');
const {getUsers, writeUsers} = require('./database/data-util');
const app = express();
const {initPassport} = require('./passport/passport-init');
const {checkAuthentification, checkLogin} = require('./passport/passport-check');
const {swaggerOptions} = require('./swagger-api/swagger-jsdoc-options');

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.post('/login', passport.authenticate('jwt', {
    session: false,
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
  value.token = jwt.sign({username: value.username}, 'secretKey');

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

app.get('/bearer/token', (req, res) => {
  const user = {name: req.body.username};
  const accessToken = jwt.sign(user, 'secretKey');
  res.json({accessToken});
})

/**
 * @swagger
 * /users:
 *  get:
 *    description: Gets all users
 *    responses: 
 *      '200': 
 *        description: All users data
 *      '401':
 *        description: Need to provide access token
 *    security:
 *      - bearerAuth: []
 */
app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
})

app.listen(3000);