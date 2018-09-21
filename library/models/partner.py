# -*- coding: utf-8 -*-
from odoo import models, fields, api, exceptions, _

class Partner(models.Model):
    _inherit = 'res.partner'

    author =  fields.Boolean('is an Author', default=False)
    publisher =  fields.Boolean('is a Publisher', default=False)
    rental_ids = fields.One2many(
        'library.rental',
        'customer_id',
        string='Rentals')
    book_ids = fields.Many2many(
        comodel_name="product.product",
        string="Books",
        domain=[('book','=',True), ],
    )
    nationality_id = fields.Many2one(
        'res.country',
        'Nationality',
    )
    birthdate =  fields.Date('Birthdate',)

    """
    def action_rent_book(self):

        return {
            'domain': [('id', 'in', new_invoice.values())],
            'name': 'Rental Wizard',
            'view_type': 'form',
            'view_mode': 'form',
            'res_model': 'library.rental.wizard',
            'context': "{'default_customer_id':'out_invoice'}",
            'type': 'ir.actions.act_window'
        }

    """
