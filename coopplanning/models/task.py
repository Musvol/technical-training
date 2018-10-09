# -*- coding: utf-8 -*-
from odoo import models, fields, api

class Task(models.Model):
    _name = 'coopplanning.task'

    _inherit = ['mail.thread']

    name = fields.Char(track_visibility='onchange')
    task_template_id = fields.Many2one('coopplanning.task.template')
    task_type_id = fields.Many2one('coopplanning.task.type', string="Task Type",track_visibility='onchange')
    worker_id = fields.Many2one('res.partner',track_visibility='onchange')
    start_time = fields.Datetime(track_visibility='onchange')
    end_time = fields.Datetime(track_visibility='onchange')

    def message_auto_subscribe(self, updated_fields, values=None):
        """ Handle auto subscription. Two methods for auto subscription exist:

         - tracked res.users relational fields, such as user_id fields. Those fields
           must be relation fields toward a res.users record, and must have the
           track_visilibity attribute set.
         - using subtypes parent relationship: check if the current model being
           modified has an header record (such as a project for tasks) whose followers
           can be added as followers of the current records. Example of structure
           with project and task:

          - st_project_1.parent_id = st_task_1
          - st_project_1.res_model = 'project.project'
          - st_project_1.relation_field = 'project_id'
          - st_task_1.model = 'project.task'

        :param list updated_fields: list of updated fields to track
        :param dict values: updated values; if None, the first record will be browsed
                            to get the values. Added after releasing 7.0, therefore
                            not merged with updated_fields argumment.
        """

        if values.get('worker_id') :
        	subtype_assign = self.env.ref('coopplanning.task_assign')
        	subtype_note = self.env.ref('mail.mt_note')
        	import pdb; pdb.set_trace()
        	self.message_subscribe(partner_ids=[values.get('worker_id')], subtype_ids=[subtype_note.id])
        	self.message_subscribe(partner_ids=[values.get('worker_id')], subtype_ids=[subtype_assign.id])

        return super(Task, self).message_auto_subscribe(updated_fields, values)

    def _track_subtype(self, init_values):

    	if init_values.get('worker_id'):
    		return 'coopplanning.task_assign'
    	else :
    		return super(Task, self)._track_subtype(init_values)









