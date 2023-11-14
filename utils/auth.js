const auth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login'); // redirect to the login page if not logged in
    } else {
      next(); // proceed to the next middleware or route handler
    }
  };

  module.exports = auth;