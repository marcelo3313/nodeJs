function checkAuthentification(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login');
}

function checkLogin(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  }

  next();
}

module.exports = {
  checkAuthentification,
  checkLogin,
};