// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Industrial Process Control UK',
	'brand': 'Industrial Process Control UK',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET,

	'wysiwyg additional plugins': 'paste',
	'wysiwyg additional options': { // eslint-disable-line
		'paste_data_images': true,
	},
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	// blog: ['posts', 'post-categories'],
	// galleries: 'galleries',
	products: ['product-categories', 'manufacturers'],
	enquiries: 'enquiries',
	users: 'users',
});

// Cloudinary config
keystone.set('cloudinary config', process.env.CLOUDINARY_URL);

// Start Keystone to connect to your database and initialise the web server
keystone.start();
