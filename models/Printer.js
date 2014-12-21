/**
 * Created by hesk on 12/13/14.
 */
/**
 * Created by hesk on 12/13/14.
 */
var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Printer = new keystone.List('Printer', {
    map: { name: 'printerName' },
    autokey: { path: 'slug', from: 'printerName', unique: true, limit: 10 }
    //autocreate: true
});

Printer.add({
        printerName: { type: String, required: true, initial: true},
        dimension: {
            spec: { type: Types.Html, wysiwyg: true }
        },
        connectivity: {
            type: Types.Select,
            options: [
                {value: 'sv', label: '802.11b/g'},
                {value: 'lte', label: 'LTE connection'},
                {value: 'wired', label: 'Ethernet Cable'}
            ],
            default: 'wired'
        },
        technology: {
            type: Types.Select,
            options: [
                { value: 'pjp', label: 'Plastic Jet Printing (PJP)' },
                { value: 'fff', label: 'Fused filament fabrication (FFF)' },
                { value: 'se', label: 'Single Extrusion' },
                { value: 'micro-sla', label: 'Micro-SLA' },
                { value: 'stereolaser', label: 'Stereolithography (Laser)' },
                { value: 'fdm', label: 'Fused Deposition Modeling' }
            ],
            default: 'pip'
        },
        manufacturer: { type: Types.Relationship, ref: 'Company' },
        producedYear: { type: Types.Number, format: false },
        countryMaker: { type: Types.Relationship, ref: 'Country' },
        listed: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    },
    'Product Size',
    {
        buildVolume: {
            L: {type: Types.Number, format: false},
            W: {type: Types.Number, format: false},
            H: {type: Types.Number, format: false}
        }
    },
    'Machine Image',
    {
        image: { type: Types.CloudinaryImage }
    },
    'Cost Accounting',
    {
        currentPrice: {type: Types.Money},
        materialCost: {type: Types.Money},
        builtEffecticiency: {type: Types.Money}
    }
);

Printer.defaultColumns = 'printerName, manufacturer, producedYear, currentPrice, listed';
Printer.schema.methods.isPublished = function () {
    return this.listed == true;
};
Printer.schema.pre('save', function (next) {
    if (this.isModified('state') && this.isPublished() && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});
Printer.register();