odoo.define('library.form_view', function (require) {
"use strict";
	
	var viewRegistry = require("web.view_registry")
	var BasicModel = require('web.BasicModel')
	var FormRenderer = require('web.FormRenderer')
	var FormView = require('web.FormView')
	var FormController = require('web.FormController');
	var core = require('web.core')
	var qweb = core.qweb
	var LibraryCustomerController = FormController.extend({

		renderButtons: function ($node) {
			 var self = this;
        	this._super($node);
			var $libraryButtons = $(qweb.render('LibraryCustomer.Buttons'))
	        this.$buttons.find('.o_form_buttons_view').append($libraryButtons) // o_form_buttons_view is an existing class in the control panel
	        this.$buttons.on('click', '.o_geolocalize', function () {
	            self._onGeolocateClick();
	        });
	        this.$buttons.on('click', '.o_pay_amount_owed', function () {
	        	self._payAmount()
	        })
	        this.reload()
		},

		_update: function (state) {

	        if (this.$buttons) {
	        	this.$buttons.find('.o_pay_amount_owed').attr('disabled', state.data.amount_owed <= 0)
	        }
	        return this._super(state)
	    },

		_onGeolocateClick: function () {
			var self = this;
	        var res_id = this.model.get(this.handle, {raw: true}).res_id
	        this._rpc({  // Needs an API key !
	            model: 'res.partner',
	            method: 'geo_localize',
	            args: [res_id]
	        }).then(function (res) {
	            self.reload();
	        });
		},

		_payAmount: function () {
			var self = this
			var partner_id = this.model.get(this.handle, {raw: true}).res_id
			this._rpc({
				model: 'res.partner',
				method: 'pay_amount_owed',
				args: [partner_id]
			}).then(function (res) {
				self.reload()
			})
		}
	})


	var LibraryCustomerView = FormView.extend({
	    config: {
	        Model: BasicModel,
	        Renderer: FormRenderer,
	        Controller: LibraryCustomerController,
	    },
	})

	viewRegistry.add('library_customer', LibraryCustomerView)

})