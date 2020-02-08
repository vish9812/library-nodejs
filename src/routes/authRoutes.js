const express = require('express');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRepo = require('../repo/auth');

const router = express.Router();

function routeHandler(data) {
  router.route('/signup')
    .get((req, res) => {
      res.render('signup', data);
    })
    .post(async (req, res) => {
      debug(req.body);

      const { username, password } = req.body;

      let user = await authRepo.findUser(username);
      if (!user) {
        user = await authRepo.saveUser(username, password);

        req.logIn(user, () => {
          debug('Successfully Signed up!');
          res.redirect('profile');
        });
      } else {
        debug('user already exists');

        res.redirect('/');
      }
    });

  router.route('/signin')
    .get((req, res) => {
      res.render('signin', data);
    })
    .post(passport.authenticate('local', {
      successRedirect: 'profile',
      failureRedirect: '/',
    }));

  router.route('/logout')
    .get((req, res) => {
      debug('check if authenticated');
      if (req.isAuthenticated()) {
        debug('logging out');
        req.logOut();
      }

      res.redirect('/');
    })
    .post(passport.authenticate('local', {
      successRedirect: 'profile',
      failureRedirect: '/',
    }));

  router.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.render('profile', { user: JSON.stringify(req.user), ...data });
    });

  return router;
}

module.exports = routeHandler;
