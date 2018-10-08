from odoo import api, fields, models, _

class ProjectTask(models.Model):
	_inherit = "project.task"

	# state = fields.Selection(selection_add=[('submitted', 'Submitted')])

	def action_set_resolve(self):
		print('YEAH')

		for task in self:
			stage_id = task.stage_find(None, domain=[('name', '=', 'Solved')])
			task.write({'stage_id': stage_id})

		return True


	@api.multi
	def _notification_recipients(self, message, groups):
		""" Handle project users and managers recipients that can convert assign
		tasks and create new one directly from notification emails. """
		groups = super(ProjectTask, self)._notification_recipients(message, groups)
		
		#return groups
		resolve_action = self._notification_link_helper('controller', controller='/task/resolve')
		
		action = [{'url': resolve_action, 'title': 'Resolve'}]
		new_group = (
				'group_project_reviewer', 
				lambda partner: bool(partner.user_ids),
				{'actions': action}
			)


		return [new_group] + groups



	def write(self, vals):
		res = super(ProjectTask, self).write(vals)

		for task in self:
			if vals.get('timesheet_ids') and task.remaining_hours < 0:
			# TODO: send email
				manager_id = task.user_id._get_related_employees().parent_id.user_id
				if manager_id.partner_id not in task.message_partner_ids :
					task.message_subscribe_users([manager_id.id])

				task.message_post(
					subject="Time warning", 
					message_type='notification',
					subtype="mail.mt_comment", 
					body="More time was spent on this task then originally planned. ({})".format(task.remaining_hours)
				)
		return res

	# <record id="ir_actions_server_sale_cart_recovery_email" model="ir.actions.server">
 #        <field name="name">Send a Cart Recovery Email</field>
 #        <field name="type">ir.actions.server</field>
 #        <field name="model_id" ref="model_sale_order"/>
 #        <field name="state">code</field>
 #        <field name="code">
 #            if records:
 #                action = records.action_recovery_email_send()
 #        </field>
 #        <field name="binding_model_id" ref="sale.model_sale_order"/>
 #    </record>