# -*- coding: utf-8 -*-
from odoo import models, fields

class Books(models.Model):
    _name = 'library.bookref'
    _description = 'Book'

    name = fields.Char(string='Title')
    authors_ids = fields.Many2many('library.partner', string="Authors")
    edition_date =  fields.Date(string='Edition date',)
    isbn = fields.Char(string='ISBN')
    publisher_id = fields.Many2one('library.publisher', string='Publisher')
    
    
    
class BookCopies(models.Model):
    _name = 'library.book.copy'
    _description = 'Specific copy of a book'
    
    _inherits = {
        'library.bookref': 'book_id',
    }

    book_id = fields.Many2one('library.bookref', required=True, ondelete='cascade')
    rental_ids = fields.One2many('library.rental', 'book_id', string='Rentals')
    
    
