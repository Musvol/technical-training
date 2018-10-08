odoo.define('library.tests', function (require) {
"use strict"
	var ListView = require('web.ListView')
	var test_utils = require('web.test_utils')
	var createView = test_utils.createView;

	//var BooleanStatusWidget = require('BooleanStatusWidget')

	QUnit.module('Library', {
		beforeEach: function () {

			this.data = {
				status: {
					fields: {
						is_late: {type: "boolean"}
					},
					records: [{
						id: 1,
						is_late: true
					}, {
						id: 2,
						is_late: false
					}]
				}
			}
		}
	})


	QUnit.test('test_exists', function (assert) {
		assert.expect(3)
		var list = createView({
			View: ListView,
			model: 'status',
			data: this.data,
			arch: 	'<tree>' + 
						'<field name="is_late" widget="boolean_status" />' +
					'</tree>'
		})


		assert.strictEqual(list.$('.o_boolean_status').length,2)
		assert.strictEqual(list.$('.o_boolean_status')[0].style.backgroundColor,"rgb(255, 0, 0)")
		assert.strictEqual(list.$('.o_boolean_status')[1].style.backgroundColor,"rgb(0, 128, 0)")

	})

	QUnit.test('test_color_options', function (assert) {
		assert.expect(2)
		var options = "{'true_color': 'orange', 'false_color': 'gray'}"

		var list = createView({
			View: ListView,
			model: 'status',
			data: this.data, // TODO: populate this.data
			arch: 	'<tree>' + 
	  					'<field name="is_late" widget="boolean_status" options="' + options + '"/>' +
					'</tree>'
		})

		assert.strictEqual(list.$('.o_boolean_status')[0].style.backgroundColor,"orange")
		assert.strictEqual(list.$('.o_boolean_status')[1].style.backgroundColor,"rgb(128, 128, 128)")

	})

	// QUnit.module('widget_boolean_status', {
	// 	beforeEach: function () {
			
	// 	},
	// 	function () {
			
	// 	}
	// })

})