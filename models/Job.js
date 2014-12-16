/**
 * Created by hesk on 12/15/14.
 */

var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Job = new keystone.List('Job', {
    nocreate: false,
    noedit: true
});

Job.add('Job Requirement', {
    budget: {type: Types.Money},
    materialSelection: {type: Types.Select, options: "type1, type2, type3"},
    phone: { type: String },
    location: { type: Types.Location },
    fileFormat: {type: Types.Select, options: "*.obj, *.3dx"},
    expectDimension: {
        L: {type: Types.Number, format: false},
        W: {type: Types.Number, format: false},
        H: {type: Types.Number, format: false}
    },
    message: { type: Types.Textarea, required: false },
    orderConfirmed: { type: Boolean, default: false }
}, "Model Processing", {
    assignedMachine: { type: Types.Relationship, ref: 'Printer' },
    createdAt: { type: Date, default: Date.now }
});

Job.defaultColumns = 'materialSelection|20%, orderConfirmed';

Job.register();