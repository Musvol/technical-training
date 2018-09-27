odoo.define('BooleanStatusWidget', function (require) {
"use strict";

var BasicFields = require('web.basic_fields');
var FieldBoolean = BasicFields.FieldBoolean

var registry = require('web.field_registry')

var BooleanStatusWidget = FieldBoolean.extend({

    init: function () {
        this._super.apply(this, arguments);
        this.trueColor = this.nodeOptions.true_color || 'red';
        this.falseColor = this.nodeOptions.false_color || 'green';
    },
    _render: function () {
        this.$el.html($('<div>').css({
            backgroundColor: this.value ? this.trueColor : this.falseColor,
            height: '15px',
            width: '15px',
            borderRadius: '50%',
            display: 'inline-block',
        }))
    },
    
});

registry.add('boolean_status', BooleanStatusWidget)

return {
    BooleanStatusWidget: BooleanStatusWidget
}


});

