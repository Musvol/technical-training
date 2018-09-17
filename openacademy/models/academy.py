from odoo import api, fields, models

class Course(models.Model):
    _description = 'Course'
    _name = 'openacademy.course'
    name = fields.Char()
    level = fields.Selection((0, "Easy"), (1, "Normal"))
    responsible = fields.One2Many('openacademy.trainer')
    
class Trainer(models.Model):
    _description = 'Trainer'
    _name = 'openacademy.trainer'
    
    sessions = fields.One2many('openacademy.session', string="Sessions")
    
class Student(models.Model):
    _description = 'Student'
    _name = 'openacademy.student'
    
    sessions = fields.Many2many('openacademy.session', string='Student')
    
    
    
class Session(models.Model):
    _description = 'Session'
    _name = 'openacademy.session'
    
    date = fields.Date("Day of training")
    course_id = fields.Many2one('openacademy.course', string='Course')
    trainer_id = fields.Many2one('openacademy.trainer', string="Trainer")
    

    
    
    
    