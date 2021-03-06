var keystone = require('keystone');
var ProductCategory = keystone.list('ProductCategory');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'products';

  // Get Product Category based on slug
  ProductCategory.model.findOne()
    .where('slug', req.params.slug)
    .exec(function (err, results) {
      if (err || !results) {
        console.log(err);
      } else {
        locals.data = results;
      }

      // Render the view
      view.render('product-category');
    });
};

