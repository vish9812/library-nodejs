function authController(data) {
  function authMiddleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  function getProfile(req, res) {
    res.render('profile', { user: JSON.stringify(req.user), ...data });
  }

  return {
    authMiddleware,
    getProfile,
  };
}

module.exports = authController;
