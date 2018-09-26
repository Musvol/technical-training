
odoo.define('library.ChartWidget', function (require) {
"use strict";

	var ajax = require('web.ajax');
	var Widget = require('web.Widget');


	var ChartWidget = Widget.extend({
		tagName: 'canvas',
		jsLibs: ['/library/static/lib/Chart.bundle.js'],

		custom_events: {
			click: '_testClick'
		},

		_testClick: function (event) {
			console.log("Event handler from chart widget", event)
		},

		init: function (parent, data) {
	        this._super.apply(this, arguments);
	        this.data = data;
	    },

	    willStart: function () {
	    	// Load Chart.js
	    	var lib_res = ajax.loadLibs(this)
	    	return $.when(lib_res, this._super.apply(this, arguments));
	    },

	    start: function () {
	    	// render chart
	    	this._renderChart()
	    	return this._super.apply(this, arguments);
	    },

	    _onClickChart: function () {

	    },

	    _renderChart: function () {
	    	var self = this
	    	var myPieChart = new Chart(this.el,{
			    type: 'pie',
			    data: {
			    	datasets: [{
			    		data: [this.data.nb_available_books, this.data.nb_rented_books, this.data.nb_lost_books]
			    	}],
			    	labels: ['Available', 'Rented', 'Lost']
			    },
			    options: {
			    	onClick: function(event, activeElements) {
			    		var states = ['available', 'rented', 'lost']
			    		var state_index = activeElements[0]._index // should check if activeElements is not empty
			    		self.trigger_up('click', {state: states[state_index]})
			    	}
			    }
			});
	    }
	})
	    

	return ChartWidget;

});