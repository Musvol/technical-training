# -*- coding: utf-8 -*-
from odoo import models, fields, api, exceptions, _

class RentalsWizard(models.TransientModel):
    _name = 'library.rental.wizard'

    customer_id = fields.Many2one(
        'res.partner',
        'Customer',
        domain=[('customer','=',True), ],
        required=True,
    )
    book_ids = fields.Many2many(
        'product.product',
        domain=[('book','=',True)],
        required=True,
    )

    @api.model
    def default_get(self, fields):

        default_values = super(RentalsWizard, self).default_get(fields)
        default_values.update({'book_ids': [(6, 0, self.env.context.get('active_ids', []))]})

        return default_values

    @api.multi
    def action_rent_book(self):
        rental = self.env['library.rental']
        self.ensure_one()
        for book in self.book_ids:
            rental.create({
                'book_id': book.id,
                'customer_id': self.customer_id.id
            })

        book_rented_ids = self.customer_id.mapped('rental_ids')

        return {
            'name': 'Rented books by {}'.format(self.customer_id),
            'type': 'ir.actions.act_window',
            'res_model': 'product.product',
            'view_mode': 'tree',
            'context': {'default_book': True},
            'domain': [('id', 'in', book_rented_ids.ids), ('book','=',True)],
            'target': 'new',
            'views': [(self.env.ref('library.book_view_tree_id'), 'tree')]
        }

class Rentals(models.Model):
    _name = 'library.rental'
    _description = 'Book rental'
    _order = "rental_date desc,return_date desc"

    customer_id = fields.Many2one(
        'res.partner',
        'Customer',
        domain=[('customer','=',True), ],
        required=True,
    )
    book_id = fields.Many2one(
        'product.product',
        'Book',
        domain=[('book','=',True)],
        required=True,
    )
    rental_date =  fields.Date(string='Rental date', required=True, default=lambda self: fields.Date.today())
    return_date =  fields.Date(string='Return date', required=False)
