from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates 


from config import db, bcrypt

# USER model, name, email, username, password validations

class User(db.Model, SerializerMixin):
    __tablename__= "users"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    notes = db.relationship('Note', back_populates='user')
    gifts = db.relationship('Gift', back_populates='user')
    recipients = db.relationship('Recipient', back_populates= 'user')


    #------SERIALIZE RULES----------------#

    #-----VALIDATIONS------#

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('What is your name?')
        if len(name) < 1:
            raise ValueError('Gonnna need at least a letter')
        return name


    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Pick something cool, pick something weird, either way gotta pick something')
        if len(username) < 5:
            raise ValueError('Longer than that')
        if len(username) > 20:
            raise ValueError('Too long, reel it in')
        return username
    
    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('That/s not how email works!')
        return address
    

    @hybrid_property
    def password_hash(self):
        self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')    
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f'''ID:{self.id},
                    name:{self.name},
                    email:{self.email},
                    username:{self.username}'''




# BIRTHDAY model, date validation

class Note(db.Model, SerializerMixin):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    body = db.Column(db.String, nullable=False)
                     
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='notes')

    recipient_id = db.Column(db.Integer, db.ForeignKey('recipients.id'), nullable=False)
    recipient = db.relationship('Recipient', back_populates='notes')


#GIFT model, character limit validation

class Gift(db.Model, SerializerMixin):
    __tablename__ = "gifts"
    
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    description = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='gifts')

    recipient_id = db.Column(db.Integer, db.ForeignKey('recipients.id'), nullable=False)
    recipient = db.relationship('Recipient', back_populates='gifts')






#RECIPIENT model, name validation

class Recipient(db.Model, SerializerMixin):
    __tablename__ = "recipients"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    name = db.Column(db.String, nullable=False)
    birthday = db.Column(db.Date, nullable=False)

    notes = db.relationship('Note', back_populates='recipient')
    gifts = db.relationship('Gift', back_populates='recipient')
    user = db.relationship('User', back_populates='recipients')