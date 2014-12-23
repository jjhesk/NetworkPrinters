/**
 * Created by hesk on 12/24/2014.
 */
'use strict';

var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Settings Model
 * ==========
 */

var Settings = new keystone.List('Settings', {
    label: 'Site Settings',
    singular: 'Site Settings',
    plural: 'Site Settings',
    track: true,
    nocreate: true,
    nodelete: true
});

Settings.add({
    siteTitle: {
        type: String,
        required: true,
        label: 'Default SEO Title',
        default: 'Primary Keyword - Secondary Keyword | Brand Name'
    },
    siteDescription: {
        type: String,
        required: true,
        label: 'Default META Description',
        default: 'This is an example of a page\'s applicable meta description. Best to keep this between 150 and 160 characters. Does NOT count towards Google SEO.'
    },
    googleID: {type: String, label: 'Google Tracking ID'}
});

// Update settings on save
Settings.schema.post('save', function () {
    this.model('Settings').updateSettings();
});


Settings.schema.statics.updateSettings = function () {
    this.findOne(function (err, settings) {
        if (err) throw 'Could not find site settings!';
        if (!settings) {
            var newSettings = new Settings.model({});
            newSettings.save(function (err, settings) {
                keystone.set('settings', settings.toJSON());
                console.log('Initialized site settings');
            });
        } else {
            keystone.set('settings', settings.toJSON());
            console.log('Updated site settings');
        }
    });
};

Settings.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Settings.register();

// init settings
Settings.model.updateSettings();