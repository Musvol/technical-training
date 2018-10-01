from odoo import api, fields, models, _

class SaleOrder(models.Model):
	_inherit = "sale.order"

	# state = fields.Selection(selection_add=[('submitted', 'Submitted')])

	state = fields.Selection([
		('draft', 'Quotation'),
		('sent', 'Quotation Sent'),
		('submitted', 'Submitted to manager'),
		('sale', 'Sales Order'),
		('done', 'Locked'),
		('cancel', 'Cancelled'),
		], string='Status', readonly=True, copy=False, index=True, track_visibility='onchange', default='draft')

	@api.multi
	def action_submit_to_manager(self):
		for order in self:
			order.state = 'submitted'
