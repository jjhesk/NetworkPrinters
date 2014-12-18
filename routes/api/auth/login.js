/**
 * Created by hesk on 12/17/14.
 */
var keystone = require('keystone'),
    maker = keystone.list('Maker');

module.exports.default = {
    "httpMethods": "get",
    "columns": {
        "visible": [
            "makerName"
        ]
    }
}

module.exports.isAdmin = {
    "__extends__": "default",

    "httpMethods": "get,post,put,delete",
    "httpGroupMethods": true                 // true will result in duplicating httpMethods to httpGroupMethods
}
module.exports.authorized = {
    "__extends__": "default",
    "httpMethods": "get",
    "httpGroupMethods": "get"
};

