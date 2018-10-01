# -*- coding: utf-8 -*-
{
    'name': "Double sales",

    'summary': """
        Add second confirmation step to sale orders""",

    'description': """
        
    """,

    'author': "Odoo",
    'website': "http://www.odoo.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/10.0/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Sale',
    'version': '0.1',
    'application': True,

    # any module necessary for this one to work correctly
    'depends': ['base', 'sale'],

    # always loaded
    'data': [
        'views/sale_order_views.xml',
    ],
    # only loaded in demonstration mode
    'demo': [],

    # static templates
    'qweb': [
        
    ],
}