/**
 * Created by hesk on 12/13/14.
 */
var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Page = new keystone.List('Page', {
    map: { name: 'menuTitle' },
    autokey: { path: 'slug', from: 'menuTitle', unique: true }

});

Page.add({
    keyword: { type: Types.Key, required: true, initial: true },
    type: { type: Types.Select, options: 'textpage, projects, services, contacts, homepage', default: 'textpage' },
    menuTitle: { type: String, required: true, initial: true },
    pageTitle: { type: String, initial: true },
    pageContent: { type: Types.Html, wysiwyg: true, height: 400 },
    seoTitle: { type: String },
    seoKeywords: { type: String },
    seoDescription: { type: String },
    isActive: { type: Types.Boolean }
});

Page.schema.virtual('pageContent.full').get(function() {
    return this.content || this.seoKeywords;
});
Page.defaultColumns = 'menuTitle|33%, keyword|20%, slug|20%, isActive|10%';
Page.register();