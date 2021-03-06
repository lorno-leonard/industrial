/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.insertCSRF);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
  // Views
  app.get('/', routes.views.index);
  app.get('/blog/:category?', routes.views.blog);
  app.get('/blog/post/:post', routes.views.post);
  app.get('/gallery', routes.views.gallery);
  app.all('/contact', routes.views.contact);

  app.get('/about', routes.views.about);
  app.get('/products', routes.views.products);
  app.get('/products/category', routes.views.products);
  app.get('/products/category/:slug', routes.views['product-category']);
  app.get('/manufacturers', routes.views.manufacturers);
	app.get('/manufacturers/:slug', routes.views['manufacturer-single']);
  app.get('/service', routes.views.service);
  app.get('/service/payments', routes.views.payments);
  app.get('/service/shipping', routes.views.shipping);
  app.get('/service/warranty', routes.views.warranty);

  app.get('/register', routes.views.register);
  app.get('/terms', routes.views.terms);
  app.get('/disclaimer', routes.views.disclaimer);
  app.get('/policy', routes.views.policy);
  app.all('/signout', routes.views.signout);

  // Accounts
  app.get('/account', routes.views.account.index);

  // API
  app.post('/api/signin', routes.api.auth.signin);
  app.get('/api/register/states/:country', routes.api.register.states);
  app.post('/api/register', routes.api.register.register);

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);

};
