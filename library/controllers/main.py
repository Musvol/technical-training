# -*- coding: utf-8 -*-

from odoo import http, fields, _
from odoo import http
from odoo.http import request
import werkzeug

class BookController(http.Controller):

	@http.route('/rentbook', type='http', auth='public', website=True)
	def rent_book(self):
		books = request.env["product.product"].search([('book','=',True)])
		return request.render('library.rent_book_template', {'books': books})

	@http.route('/register_rental/<model("product.product"):book>', methods=['POST', 'GET'])
	def register_rental(self, book, auth='user'):
		#import pdb; pdb.set_trace()
		customer = request.env['res.partner'].search([('id', '=', request.env.context.get('uid'))])
		request.env['library.rental'].create({'customer_id': customer.id, 'book_id': book.id})

		#return request.redirect('/rentbook')
		return werkzeug.utils.redirect('/rentbook')

