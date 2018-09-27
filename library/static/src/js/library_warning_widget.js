odoo.define('WarningWidget', function (require) {
"use strict";

    var BasicFields = require('web.basic_fields');
    var FieldInteger = BasicFields.FieldInteger
    var core = require('web.core')
    var qweb = core.qweb
    var registry = require('web.field_registry')

    var WarningWidget = FieldInteger.extend({

        
        _renderReadonly: function () {
            var alertType = null
            if (this.value === 0) {
                alertType = 'success'
            }
            else if (this.value < 3)  {
                alertType = 'warning'
            }
            else {
                alertType = 'danger'
            }
            //this.$el.html('<div>' + this.value + '€</div>');
            this.$el.html(qweb.render('LibraryWarning', {amount: this.value, type: alertType}));
        }
    });

    registry.add('library-warning', WarningWidget)

    return {
        WarningWidget: WarningWidget
    }


});

