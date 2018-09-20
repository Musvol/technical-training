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

    money_owed = fields.Float(compute='_compute_money_owed', string="Money owed", readonly=True, default=0)

    @api.multi
    @api.depends('rental_ids')
    def _compute_money_owed(self):
        for partner in self:
            partner.money_owed = sum(rental.price for rental in partner.rental_ids.search([('state', '!=', 'returned')]))