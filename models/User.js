var keystone = require('keystone');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User', {
  nodelete: true,
});

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
  username: { type: Types.Text, initial: true, required: true, index: true, unique: true },
  password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});

// Profile details on schema
User.schema.add({
  profile: { type: mongoose.Schema.Types.Mixed },
});


// Unique Validator
User.schema.plugin(uniqueValidator);

/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
