var keystone = require('keystone');
var _ = require('lodash');
var country_list = require('country-list')();

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Check if logged in
  if (req.user) {
    res.redirect('/');
    return;
  }

  // Get Countries
  var countries = country_list.getCodeList();
  var countryArr = [];
  var ukCountry = {};
  _.each(countries, function (value, key) {
    if (key !== 'gb') {
      countryArr.push({
        name: value,
        value: key.toUpperCase(),
      });
    } else {
      ukCountry.name = value;
      ukCountry.value = key.toUpperCase();
    }
  });
  countryArr.splice(0, 0, ukCountry);
  locals.countries = countryArr;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'register';

  // Render the view
  view.render('register');
};
