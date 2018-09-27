odoo.define('ScanWidget', function (require) {
"use strict";

    var Widget = require('web.Widget')
    var SystrayMenu = require('web.SystrayMenu');
    var BasicFields = require('web.basic_fields');
    var InputField = BasicFields.InputField

    var ScanWidget = Widget.extend({
        template: 'Scan',

        events: {
            input: '_onScanInput'
        },

        // start: function () {
        //     var self = this
        //     var $input = this.$el.find('.o_scan')
        //     this.$el.on('input', '.o_scan_input', function (e) {
        //         debugger
        //         self._onScanInput(e)
        //     })
        // },

        _onScanInput: function (event) {
            console.log(event.target.value)
            var id = parseInt(this.$('.o_scan_input').val());
            id = parseInt(event.target.value)
            console.log(id, typeof(id))
            if (!_.isNaN(id)) {
                // debugger
                this.do_action('library.action_customer_form', {
                    res_id: id,
                })
                // this.do_action({
                //     type: 'ir.actions.act_window',
                //     res_model: 'res.partner',
                //     res_id: id,
                //     views: [[false, 'form']],
                //     //target: 'current'
                // })
            }
        },

        // _onScanInput(event) {
        //     var id = event.target.value
        //     this.do_action('library.action_customer_form', {
        //         res_id: parseInt(id),
        //     })
        // }
    })

    SystrayMenu.Items.push(ScanWidget);
})

