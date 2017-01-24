var keystone = require('keystone');
var Manufacturer = keystone.list('Manufacturer');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'manufacturers';

	// Get all Manufacturers
	Manufacturer.model.find()
		.sort('name')
		.exec(function (err, results) {
			if (err || !results.length) {
				locals.data = [];
				console.log(err);
			} else {
				locals.data = results;
			}

			// Render the view
			view.render('manufacturers');
		});
};
