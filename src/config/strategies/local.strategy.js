const passport = require('passport');
const { Strategy } = require('passport-local');

const authRepo = require('../../repo/auth');

function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, done) => {
    const user = await authRepo.findUser(username);

    if (user.password === password) {
      done(null, user);
    } else {
      done(null, false);
    }
  }));
}

module.exports = localStrategy;
