var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Categories Model
 * =============
 */

var ProductCategories = new keystone.List('ProductCategories');

ProductCategories.add({
	name: { type: Types.Text, required: true },
});

ProductCategories.defaultSort = 'name';
ProductCategories.register();
