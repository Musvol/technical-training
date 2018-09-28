odoo.define('library.LibraryKanbanView', function (require) {
"use strict";

var core = require('web.core');
var KanbanController = require('web.KanbanController');
var KanbanModel = require('web.KanbanModel');
var KanbanRenderer = require('web.KanbanRenderer');
var KanbanView = require('web.KanbanView');
var view_registry = require('web.view_registry');

var _lt = core._lt;
var qweb = core.qweb;


var LibraryKanbanController = KanbanController.extend({

    events: {
        'click .o_customer': '_onCustomerClick' 
    },

    init: function () {
        this.selectedCustomer = null
        return this._super.apply(this, arguments)
    },

    willStart: function () {
        var def1 = this._super.apply(this, arguments);
        var def2 = this._loadCustomers();
        return $.when(def1, def2);
    },

    _update: function () {
        var self = this;
        return this._super.apply(this, arguments).then(function () {
            var data = {
                customers: self.customers,
                selected: self.selectedCustomer
            }
            self.$('.o_kanban_view').prepend(qweb.render('CustomerList', data));
        });
    },

    _loadCustomers: function () {
        var self = this
        return this._rpc({
            route: '/web/dataset/search_read',
            model: 'res.partner',
            fields: ['display_name'],
            domain: [['current_rental_ids', '=', 'True']],
            limit: 80,
        }).then(function (result) {
            console.log(result.records)
            self.customers = result.records
        })
    },

    reload: function (params) { // reload kanban view
        // Load only rentals of the selected customer
        params = params || {}
        if (this.selectedCustomer) {
            params.domain = [['customer_id', '=', this.selectedCustomer]];
        } else {
            params.domain = [[1, '=', 1]]
        }
        return this._super(params)
    },

    _onCustomerClick: function (event) {
        var id = parseInt(event.target.id)
        this.selectedCustomer = this.selectedCustomer === id ? null : id
        
        this.reload()
        // return this.do_action('library.action_customer_form', {
        //     res_id: parseInt(event.target.id), // Should check that's an Int
        // })
    }
})

var LibraryKanbanView = KanbanView.extend({
    config:  {
        Model: KanbanModel,
        Renderer: KanbanRenderer,
        Controller: LibraryKanbanController,
    },
    display_name: 'Library Kanban',
    icon: 'fa-th-list',
});

view_registry.add('library_kanban', LibraryKanbanView);

});