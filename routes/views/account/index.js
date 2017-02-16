var keystone = require('keystone');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Check if not logged in
  if (!req.user || (req.user && req.user.isAdmin)) {
    res.redirect('/');
    return;
  }

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'account';

  // Render the view
  view.render('account/index');
};
