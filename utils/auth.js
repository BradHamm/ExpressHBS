const auth = (req, res, next) => {
  if (req.session.user_id) {
    req.session.lastAccess = Date.now();
    next();
  } else {
    res.redirect('/login');
  }
  };

  module.exports = auth;