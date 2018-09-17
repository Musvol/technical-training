from odoo import api, fields, models

class Book(models.Model):
    
    _name = 'library.book'
    name = fields.Char('Title')
    isbn = fields.Char('ISBN')
    author_ids = fields.Many2many('library.author')
    loan_ids = fields.One2many('library.loan', 'book_id')
    
    
class Loan(models.Model):
    _name = 'library.loan'
    book_id = fields.Many2one('library.book')
    customer_id = fields.Many2one('library.customer')
    return_date = fields.Date()
    
class Author(models.Model):

    _name = 'library.author'
    name = fields.Char()
    book_ids = fields.Many2many('library.book')

    
class Customer(models.Model):
    _name = 'library.customer'
    _inherit = 'res.partner'
    loan_ids = fields.One2many('library.loan', 'customer_id')
    
    
    
    