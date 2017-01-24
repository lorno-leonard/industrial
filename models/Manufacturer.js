var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Categories Model
 * =============
 */

var Manufacturer = new keystone.List('Manufacturer');

Manufacturer.add({
	name: { type: Types.Text, required: true },
	top: { type: Types.Boolean, default: false },
});

Manufacturer.defaultSort = 'name';
Manufacturer.defaultColumns = 'name, top';
Manufacturer.register();
