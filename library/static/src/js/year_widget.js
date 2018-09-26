odoo.define('YearWidget', function (require) {
"use strict";

var BasicFields = require('web.basic_fields');
var FieldInteger = BasicFields.FieldInteger

var registry = require('web.field_registry')

var YearWidget = FieldInteger.extend({

    
    _formatValue: function (value) {
        if (typeof value === 'string') {
            if (!/^[0-9]+/.test(value)) {
                throw new Error('"' + value + '" is not an integer or a virtual id');
            }
            return value;
        }
        return value
    },
});

registry.add('year', YearWidget)

return {
    YearWidget: YearWidget
}


});

