var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Categories Model
 * =============
 */

var ProductCategory = new keystone.List('ProductCategory');

ProductCategory.add({
	name: { type: Types.Text, required: true },
	top: { type: Types.Boolean, default: false },
});

ProductCategory.defaultSort = 'name';
ProductCategory.defaultColumns = 'name, top';
ProductCategory.register();
