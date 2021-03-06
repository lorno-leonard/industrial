/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var async = require('async');
var keystone = require('keystone');
var ProductCategory = keystone.list('ProductCategory');
var Manufacturer = keystone.list('Manufacturer');


/**
  Initialises the standard view locals

  The included layout depends on the navLinks array to generate
  the navigation in the header, you may wish to change this array
  or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
  res.locals.navLinks = [
    { label: 'Home', key: 'home', href: '/' },
    // { label: 'Blog', key: 'blog', href: '/blog' },
    // { label: 'Gallery', key: 'gallery', href: '/gallery' },
    // { label: 'Contact', key: 'contact', href: '/contact' },
    { label: 'About Us', key: 'about', href: '/about' },
    { label: 'Products', key: 'products', href: '/products' },
    { label: 'Manufacturers', key: 'manufacturers', href: '/manufacturers' },
  ];

  res.locals.navRightLinks = [
    { label: 'Customer Service', key: 'service', href: '/service' },
    { label: 'Contact Us', key: 'contact', href: '/contact' },
    { label: 'Register', key: 'register', href: '/register' },
    { label: 'Account', key: 'account', href: '/account' },
    { label: 'Admin', key: 'admin', href: '/keystone' },
    { label: 'Signout', key: 'signout', href: '/signout' },
  ];

  // Bottom links
  res.locals.bottomLinks = [
    { label: 'Home', key: 'home', href: '/' },
    { label: 'About Us', key: 'about', href: '/about' },
    { label: 'Terms and Conditions', key: 'terms', href: '/terms' },
    { label: 'Disclaimer', key: 'disclaimer', href: '/disclaimer' },
    { label: 'Privacy Policy', key: 'policy', href: '/policy' },
    { label: 'Contact Us', key: 'contact', href: '/contact' },
  ];

  async.series([
    function (callback) {
      // Product Categories
      ProductCategory.model.find()
        .where('top', true)
        .exec(function (err, results) {
          if (err || !results.length) {
            return callback(err);
          }

          res.locals.productCategories = results;
          callback();
        });
    },
    function (callback) {
      // Manufacturers
      Manufacturer.model.find()
        .where('top', true)
        .exec(function (err, results) {
          if (err || !results.length) {
            return callback(err);
          }

          res.locals.manufacturers = results;
          callback();
        });
    },
  ], function (err, results) {
    if (err) {
      next(err);
    }
    next();
  });

  // User
  res.locals.user = req.user;

  // Check if there's a user
  if (req.user) {
    res.locals.navAccountLinks = [
      { label: 'Account Information', key: 'account', href: '/account' },
      { label: 'Inquiries', key: 'account-inquiries', href: '/account/inquiries' },
      { label: 'Quotations', key: 'account-quotations', href: '/account/quotations' },
      { label: 'Orders', key: 'account-orders', href: '/account/orders' },
      { label: 'Invoices', key: 'account-invoices', href: '/account/invoices' },
      { label: 'My Messages', key: 'account-messages', href: '/account/messages' },
    ];
  }
};


/**
  Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error'),
  };
  res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
  next();
};


/**
  Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else {
    next();
  }
};

// Insert CSRF
exports.insertCSRF = function (req, res, next) {
  res.locals.csrf_token_key = keystone.security.csrf.TOKEN_KEY;
  res.locals.csrf_token_value = keystone.security.csrf.getToken(req, res);
  res.locals.csrf_query = '&' + keystone.security.csrf.TOKEN_KEY + '=' + keystone.security.csrf.getToken(req, res);
  next();
};
