var keystone = require('keystone');
var ProductCategory = keystone.list('ProductCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'products';

	// Get all Manufacturers
	ProductCategory.model.find()
		.sort('name')
		.exec(function (err, results) {
			if (err || !results.length) {
				locals.data = [];
				console.log(err);
			} else {
				locals.data = results;
			}

			// Render the view
			view.render('products');
		});
};
