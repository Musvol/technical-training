# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import logging

from odoo.addons.mail.controllers.main import MailController
from odoo import http

_logger = logging.getLogger(__name__)


class TaskController(http.Controller):

    @http.route('/task/resolve', type='http', auth='user', methods=['GET'])
    def crm_lead_case_mark_won(self, res_id, token):
        comparison, record, redirect = MailController._check_token_and_record_or_redirect('project.task', int(res_id), token)
        if comparison and record :
            try: 
                record.action_set_resolve()
            except:
                _logger.exception("Could not set project as resolved")
                return MailController._redirect_to_messaging()
        return redirect

    