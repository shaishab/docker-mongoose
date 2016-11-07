const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const path = require('path');
const logger = require(path.resolve('./config/lib/winston'));

/**
* @function login
* @summary login the user to the request
* @param {User} user
* @param {Response} res - Express response object
*/
const login = function login (user, req, res) {
  req.login(user, err => {
    if (err) {
      logger.error('req.login failed', err);
      res.status(400).send(err);
    }
    res.jsonp(User.makeCopy(user));
  });
};

/**
* @function authenticateAndLogin
* @summary Authenticate the user and then log them in
* @param {string} strategy - Strategy to use
* @param {Request} req - Express request object
* @param {Response} res - Express response object
* @param {Function} next - Next middleware
*/
const authenticateAndLogin = function authenticateAndLogin (strategy, req, res, next) {
  passport.authenticate(strategy, (error, user, info) => {
    if (error || !user) {
      logger.error('User authentication failed', { error, user, info });
      res.status(400).send(info);
    } else {
      // Maybe do some password expiration checks if desired
      login(user, req, res);
    }
  })(req, res, next);
};

exports.signout = function signout (req, res) {
  req.logout();
  res.redirect('/');
};

exports.signin = function signin (req, res, next) {
  authenticateAndLogin('local', req, res, next);
};

exports.signup = function signup (req, res) {
  const user = new User(User.makeCopy(res.body));
  user.save(err => {
    if (err) {
      logger.error('Failed to create a user account', err);
      res.status(400).send(err);
    } else {
      login(user, req, res);
    }
  });
};

exports.forgot = function forgot (req, res) {
  res.end('Feature coming soon');
};