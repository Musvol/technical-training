# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Courses(models.Model):
    _name = 'openacademy.course'

    name = fields.Char()
    user_id = fields.Many2one('res.users', string="Responsible")


class Sessions(models.Model):
    _name = 'openacademy.session'

    course_id = fields.Many2one('openacademy.course', string="Course")
    user_id = fields.Many2one('res.users', string="Instructor")
    start_date = fields.Date()
    seats = fields.Integer('Room Capacity')
    attendee_cnt = fields.Integer(compute="get_attendee_count")
    attendee_ids = fields.Many2many('res.partner', string="Attendees")

    @api.depends('attendee_ids')
    def get_attendee_count(self):
        for record in self:
            record.attendee_cnt = len(record.attendee_ids)

    @api.constrains('attendee_cnt', 'seats')
    def _check_description(self):
        for record in self:
            if record.attendee_cnt > record.seats:
                raise ValidationError("No seat left in the classroom.")