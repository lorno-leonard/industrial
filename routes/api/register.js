var keystone = require('keystone');
var countryjs = require('countryjs');
var _ = require('lodash');
var async = require('async');
var User = keystone.list('User');

// GET /api/register/states/:country
exports.states = function (req, res) {
  return res.status(200)
    .json({
      success: true,
      data: countryjs.states(req.params.country),
    });
};

// POST /api/register
exports.register = function (req, res) {
  if (!req.body.username || !req.body.email || !req.body.password || !req.body.name || !req.body.country) {
    return res.status(401)
      .json({
        success: false,
        message: 'Please enter the required fields.',
      });
  }

  async.parallel({
    check_username: function (callback) {
      User.model.findOne()
        .where('username', req.body.username)
        .exec(function (err, user) {
          if (err) {
            var message = err && err.message ? err.message : 'There was an issue with the Username';
            callback(null, message);
            return;
          }

          if (user) {
            callback(null, 'Username is already taken.');
            return;
          }

          callback();
        });
    },
    check_email: function (callback) {
      User.model.findOne()
        .where('email', req.body.email)
        .exec(function (err, user) {
          if (err) {
            var message = err && err.message ? err.message : 'There was an issue with the Email Address';
            callback(null, message);
            return;
          }

          if (user) {
            callback(null, 'Email Address is already taken.');
            return;
          }

          callback();
        });
    },
  }, function (err, results) {
    if (err) {
      return res.status(401)
        .json({
          success: false,
          message: (err && err.message ? err.message : false) || 'Sorry, there was an issue registering. Please try again.',
        });
    }

    var errorMessage = [];
    if (!_.isUndefined(results.check_username)) {
      errorMessage.push(results.check_username);
    }
    if (!_.isUndefined(results.check_email)) {
      errorMessage.push(results.check_email);
    }

    if (errorMessage.length > 0) {
      return res.status(401)
        .json({
          success: false,
          message: errorMessage.length > 1 ? errorMessage : errorMessage[0],
        });
    }

    // Create User
    var fields = [
      'name',
      'username',
      'email',
      'password',
    ];
    var user = new User.model(_.pick(req.body, fields));
    user.profile = _.omit(req.body, _.union(fields, ['_csrf']));
    user.save(function (err) {
      if (err) {
        return res.status(401)
          .json({
            success: false,
            message: (err && err.message ? err.message : false) || 'Sorry, there was an issue registering. Please try again.',
          });
      }

      return res.status(200)
        .json({
          success: true,
        });
    });
  });
};
