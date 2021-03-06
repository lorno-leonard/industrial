var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Categories Model
 * =============
 */

var ProductCategory = new keystone.List('ProductCategory', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
});

ProductCategory.add({
  name: { type: Types.Text, required: true },
  top: { type: Types.Boolean, default: false },
  content: { type: Types.Html, wysiwyg: true, height: 400 },
  image: {
    type: Types.LocalFile,
    dest: './public/uploads/category/',
    prefix: '/category/',
    allowedTypes: [
      'image/jpeg',
      'image/png',
    ],
    filename: function (item, file) {
      return item.id + '.' + file.extension;
    },
  },
});

ProductCategory.defaultSort = 'name';
ProductCategory.defaultColumns = 'name, slug, top';
ProductCategory.register();
