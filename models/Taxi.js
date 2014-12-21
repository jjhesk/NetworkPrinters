/**
 * Created by Hesk on 14年12月19日.
 */
var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Taxi = new keystone.List('Taxi', {
    autokey: {from: 'licensePlate', path: 'key', unqiue: true}
});
Taxi.add({
    licensePlate: {type: String, required: true, initial: true},
    driver: {type: Types.Relationship, ref: 'User'},
    color: {
        type: Types.Select,
        options: [
            { value: 'red', label: 'Red Taxi' },
            { value: 'blue', label: 'Blue Taxi' },
            { value: 'green', label: 'Green Taxi' }
        ],
        default: 'green'
    }
});
Taxi.defaultColumns = 'licensePlate, color, driver';
Taxi.register();