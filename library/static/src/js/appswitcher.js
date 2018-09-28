odoo.define('library.AppSwitcher', function (require) {
"use strict";

var AppSwitcher = require('web_enterprise.AppSwitcher');
var core = require('web.core');

var QWeb = core.qweb;



AppSwitcher.include({
    render: function () {
        this._super.apply(this, arguments);
        if (moment().isoWeekday() === 4 && !$('.alert').length) {
            // only display on Mondays
            // should check if message not already exists
            this.$el.prepend(QWeb.render('AppSwitcherPromo'));
        }
    },
});

// AppSwitcher.include({
//     render: function () {
//         this._super.apply(this, arguments);

//         if (moment().isoWeekday() === 4 && !$('.alert').length) {
//             // only display on Mondays
//             // should check if message not already exists
//             this.$el.append("QWeb.render('AppSwitcherPromo')");
//         }
//     },
// });

});