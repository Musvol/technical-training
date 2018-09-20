# -*- coding: utf-8 -*-
from odoo import models, fields, api, exceptions, _

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
    return_date =  fields.Date(string='Return date', required=True)

    price = fields.Float(string="Rental price", compute='_compute_price')

    state = fields.Selection([
            ('rented', 'Rented'),
            ('returned', 'Returned'),
            ('lost', 'Lost'),
            ],default='rented', string='Status', readonly=True)

    @api.multi
    @api.depends('rental_date', 'return_date')
    def _compute_price(self):
        
        for rental in self:

            price = 0
            
            if rental.state == 'lost':
                price = 15
            else :
                rental_date = fields.Date.from_string(rental.rental_date)

                if not rental.return_date:
                    return_date = fields.Date.from_string(fields.Date.today())
                else:    
                    return_date = fields.Date.from_string(rental.return_date)
                price = (return_date - rental_date).days * 0.1


            rental.price = price

    @api.multi
    def action_lost(self):
        for book in self:
            book.state = 'lost'

    @api.multi
    def action_returned(self):
        for book in self:
            book.state = 'returned'
            book.return_date = fields.Date.from_string(fields.Date.today())

    

