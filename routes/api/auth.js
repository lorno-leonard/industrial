var keystone = require('keystone');
var User = keystone.list('User');

// POST /api/signin
exports.signin = function (req, res) {
  if (!keystone.security.csrf.validate(req)) {
    return res.status(401)
      .json({
        success: false,
        message: 'There was an error with your request. Please refresh the page and try again.',
      });
  }

  if (!req.body.username || !req.body.password) {
    return res.status(401)
      .json({
        success: false,
        message: 'Please enter your Username/Email Address and Password.',
      });
  }

  User.model.findOne()
    .or([{ username: req.body.username }])
    .or([{ email: req.body.username }])
    .exec(function (err, user) {
      if (err || !user) {
        return res.status(401)
          .json({
            success: false,
            message: (err && err.message ? err.message : false) || 'Username/Email Address or Password is invalid.',
          });
      }

      keystone.session.signin({
          email: user.email,
          password: req.body.password,
        },
        req,
        res,
        function (user) {
          return res.status(200)
            .json({
              success: true,
            });
        },
        function (err) {
          return res.status(401)
            .json({
              success: false,
              message: (err && err.message ? err.message : false) || 'Username/Email Address or Password is invalid.',
            });
        });
    });
};
