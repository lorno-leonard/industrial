var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Categories Model
 * =============
 */

var Manufacturer = new keystone.List('Manufacturer', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
});

Manufacturer.add({
  name: { type: Types.Text, required: true },
  top: { type: Types.Boolean, default: false },
  content: { type: Types.Html, wysiwyg: true, height: 400 },
});

Manufacturer.defaultSort = 'name';
Manufacturer.defaultColumns = 'name, slug, top';
Manufacturer.register();
