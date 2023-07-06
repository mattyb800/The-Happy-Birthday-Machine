from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates 
from app import bcrypt

from config import db

# USER model, name, email, username, password validations

class User(db.Model, SerializerMixin):
    __tablename__= "users"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    name = db.Column(db.String)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)

    birthdays = db.relationship('Birthday', back_populates='user')
    gifts = db.relationship('Gift', back_populates='user')
    recipients = association_proxy('birthdays', 'recipient')


    #-----VALIDATIONS------#









# BIRTHDAY model, date validation

class Birthday(db.Model, SerializerMixin):
    __tablename__ = "birthdays"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    date = db.Column(db.DateTime)
                     
    user_id = db.Column(db.Integer, db.ForeingKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='birthdays')

    recipient_id = db.Column(db.Integer, db.ForeignKey('recipients.id'), nullable=False)
    recipient = db.relationship('Recipient', back_populates='birthdays')


#GIFT model, character limit validation

class Gift(db.Model, SerializerMixin):
    __tablename__ = "gifts"
    
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    description = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeingKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='gifts')

    recipient_id = db.Column(db.Integer, db.ForeignKey('recipients.id'), nullable=False)
    recipient = db.relationship('Recipient', back_populates='gifts')






#RECIPIENT model, name validation

class Recipient(db.Model, SerializerMixin):
    __tablename__ = "recipients"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    name = db.Column(db.String)
    email = db.Column(db.String)

    birthdays = db.relationship('Birthdays', back_populates='recipient')
    gifts = db.relationship('Gift', back_populates='recipient')
    users = association_proxy('birthdays', 'user')