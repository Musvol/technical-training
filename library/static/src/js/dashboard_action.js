odoo.define('library.client_action', function(require) {
"use strict";

	var ControlPanelMixin = require('web.ControlPanelMixin');
	var core = require('web.core')
	var Widget = require('web.Widget')
	var ChartWidget = require('library.ChartWidget');

	var QWeb = core.qweb

	var ClientAction = Widget.extend(ControlPanelMixin, {

		template: 'MyDashboard',
		custom_events: {
			click: '_onOpenBooks'
		},


		init: function(parent, action) {
			this._super.apply(this, arguments)
			this.action_manager = parent
			this.action = action
		},

		willStart: function() {
			self = this
			var res = this._rpc({route: '/library/statistics'}).then(function(stats) {
				self.stats = stats
			})

			return $.when(this._super.apply(this, arguments), res)
		},

		start: function() {
			// render buttons
			this.$buttons = $(QWeb.render('LibraryDashboard.Buttons'));

			// render chart
			this._renderChart()

			this._updateControlPanel()
	        this.$buttons.on('click', '.o_bad_customers', this._onOpenBadCustomers.bind(this));
	        this.$buttons.on('click', '.o_lost_books', this._onOpenLostBooks.bind(this));
			return $.when(this._super.apply(this, arguments))
		},

		_updateControlPanel: function () {
	        this.update_control_panel({
	            breadcrumbs: this.action_manager.get_breadcrumbs(),
	            cp_content: {
	                $buttons: this.$buttons,
	            },
	        });
	    },

	    _onOpenLostBooks: function() {
	    	this.do_action('library.action_lost_books')
	    },

	    _onOpenBadCustomers: function() {
	    	this.do_action('library.action_bad_customer')
	    },

	    _onOpenBooks: function (event) {
	    	// do action according to the state
	    	var state = event.data.state
	    	var action = null

	    	if (state === "available"){
	    		action = "library.action_available_books"
	    	}
	    	else if (state === "rented"){
	    		action = "library.action_rented_books"
	    	}
	    	else if (state === "lost"){
	    		action = "library.action_lost_books"
	    	}
	    	event.stopPropagation()
	    	this.do_action(action)
	    },

	    /**
	     * @private
	     */
	    _renderChart: function () {

	    	var data = {
	    		nb_available_books: this.stats.nb_available_books,
	            nb_rented_books: this.stats.nb_rented_books,
	            nb_lost_books: this.stats.nb_lost_books,
	    	}   
	    	var chart = new ChartWidget(this, data);
	    	var canvas_container = this.$('.chart')
	        canvas_container.empty();
	        return chart.appendTo(canvas_container);
	    }

	})
	core.action_registry.add('library.dashboard', ClientAction)

})
