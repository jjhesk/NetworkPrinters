var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
    name: {type: Types.Name, required: true, index: true},
    email: {type: Types.Email, initial: true, required: true, index: true},
    password: {type: Types.Password, initial: true, required: true},
    cellPhone: {type: Types.Number},
    vcoinID: {type: Types.Text, label: "vCoin Account UUID"},
    customization: {type: Types.Color},
    website: {type: String, label: "vCoin Account UUID"}
}, 'Notification', {
    notifications: {
        posts: {type: String},
        meetups: {type: String}
    }
}, 'Permissions', {
    /*   state: {
     type: Types.Select,
     options: [
     {value: 'enabled', label: 'Enabled'},
     {value: 'disabled', label: 'Disabled'}
     ],
     default: 'enabled'
     },*/
    role: {type: Types.Select, options: 'admin, licenseIssuer, driver, printerMaker, user', default: 'user'},
    isAdmin: {type: Boolean, label: 'Can access Keystone', index: true},
    isVerified: {type: Boolean, label: 'Account Verification'}
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
    return this.isAdmin;
});

/**
 * Relationships
 */
User.relationship({ref: 'Maker', path: 'makerName'});


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();