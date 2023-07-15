#!/usr/bin/env python3

from flask import request, make_response, session, jsonify
from flask_restful import Resource
from flask_login import LoginManager, UserMixin, login_user, current_user, logout_user, login_required
from flask_migrate import Migrate
# Local imports
from config import app, api, db
from models import User, Recipient, Note, Gift
import traceback
import datetime

login_manager = LoginManager()

login_manager.init_app(app)
app.secret_key = b'\x1d"\xc3\xbf\xccS\xa8\t\xff1\xe7\xc0\x07ydx'

# Views go here!

@app.route('/')
def index():
    return '<h1>The Happy Birthday Machine</h1>'


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == user_id).first()

#-----------SIGNUP-----------#
class Signup(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(
            name = data.get('name'),
            username = data.get('username'),
            email = data.get('email'))
        new_user.password_hash = data.get('password')
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember=True)
        return make_response(new_user.to_dict(), 201)


api.add_resource(Signup, '/signup')    

    


#----------LOGIN-----------#
class Login(Resource):
    def post(self):
     try:
        data = request.get_json()
        user = User.query.filter_by(username = data.get('username')).first()
        password = request.get_json()['password']

        if user.authenticate(password):
            login_user(user, remember=True)
            return user.to_dict(), 200
        if not user:
            return{'Invalid Username/Password'}, 401
     except:
        return make_response('Gotta log in', 401)

api.add_resource(Login, '/login')

#----------AUTHORIZED SESSION-----------#
class AuthorizedSession(Resource):
    def get(self):
     try:   
        if current_user.is_authenticated:
            user = current_user.to_dict()
            return make_response(user,200)
     except:
         return make_response('Not Authorized', 404)

api.add_resource(AuthorizedSession, '/authorize_session')

#----------LOGOUT------------#
class Logout(Resource):
    def get(self):
        session['user_id'] = None
        return make_response('Successfully Logged Out', 204)

api.add_resource(Logout, '/logout')

#-----------USER VIEWS--------------#
class CurrentUser(Resource):
   # @login_required
    def get(self, username):
            user = User.query.filter(User.username == username).first()
            if not user:
                return make_response("User Not Found", 404)
            return make_response(user.to_dict(),200)
   # @login_required
    def patch(self, username):
            user = User.query.filter(User.username == username).first()
            data = request.get_json()
            try:
                for attr in data:
                    setattr(user, attr, data.get(attr))
                db.session.add(user)
                db.session.commit()
            except:
                return make_response("Unable to update", 400)    
            return make_response(user.to_dict(),200)



api.add_resource(CurrentUser, '/users/<string:username>')   


class Recipients(Resource):
   @login_required
   def get(self, username):
        user = User.query.filter(User.username == username).first()
        if user:
            recipients = []
            for recipient in user.recipients:
                recipients_list = recipient.to_dict()
                recipients.append(recipients_list)
            return make_response( recipients, 200)
        if not user:
            return make_response("Not Found", 404)
    
   @login_required
   def post(self,username):
        data = request.get_json()
        
        user = User.query.filter(User.username == username).first()
        format_birthday = '%Y-%m-%d'
        birthday = datetime.datetime.strptime(data["birthday"], format_birthday).date()
        if user:
            try:
                new_recipient = Recipient(
                    user_id = user.id,
                    name = data.get('name'),
                    birthday = birthday)
                db.session.add(new_recipient)
                db.session.commit()
            
            except:
                return make_response("Could not add recipient", 400)

            return make_response(new_recipient.to_dict(), 200) 

        if not user:
            return make_response("Gotta Log In", 404) 
        
       
    
api.add_resource(Recipients, '/users/<string:username>/recipients')  


class Notes(Resource):
   # @login_required
    def get(self, recipient_id):
        try:
            notes_dict = [note.to_dict() for note in Note.query.filter(Note.recipient_id == recipient_id).all()]
            return {"notes": notes_dict}
        except:
            make_response("Not Found", 404)
   # @login_required


            
api.add_resource(Notes, '/notes/<int:recipient_id>') 

class Gifts(Resource):
    @login_required
    def get(self, username):
        user = User.query.filter(User.username == username).first()
        if user:
            gifts = []
            for gift in user.gifts:
                gifts_list = gift.to_dict()
                gifts.append(gifts_list)
            return make_response( gifts, 200)
        if not user:
            return make_response("Not Found", 404)

api.add_resource(Gifts, '/users/<string:username>/gifts')

class AddGifts(Resource):
    @login_required
    def post(self):
        data = request.get_json()

        user = current_user

        if user:
            try:
                new_gift = Gift(
                    user_id=user.id,
                    description=data["description"],
                    image=data["image"],
                    locations=data["locations"],

                )
                db.session.add(new_gift)
                db.session.commit()
            except:
                return make_response("Could not add gift", 400)

            return make_response(new_gift.to_dict(), 200)    

api.add_resource(AddGifts, '/gifts')      


#----------RECIPIENT VIEWS--------------#
class OneRecipient(Resource):
   #@login_required
   def get(self,id):
       recipient = Recipient.query.filter(Recipient.id == id).first()
       if not recipient:
           return make_response("Not Found", 404)
       return make_response(recipient.to_dict(), 200)

        
   def delete(self, id):
       recipient = Recipient.query.filter(Recipient.id == id).first()

       db.session.delete(recipient)
       db.session.commit()

       return make_response({}, 202)
   
   def patch(self, id):
       recipient = Recipient.query.filter(Recipient.id == id).first()

       data = request.get_json()
       format_birthday = '%Y-%m-%d'
       birthday = datetime.datetime.strptime(data["birthday"], format_birthday).date()
       try:
           for attr in data:
               if attr == birthday:
                    birthday = datetime.datetime.strptime(data["birthday"], format_birthday).date()
               setattr(recipient, attr, data.get(attr))
           db.session.add(recipient)
           db.session.commit()
       except Exception as e: 
                 traceback.print_exc() 
                 return {"error" : "whatever you want your message to be", "message": str(e)}, 500  
       

   
       
       
       
        

api.add_resource(OneRecipient, '/recipient/<int:id>'  )     
#-----------NOTES------------------------#
class AddNotes(Resource):
    def post(self):
        data = request.get_json()
        print(data)
        
        user = current_user                                  
        recipient_id = data.get("recipient_id")
        if user:
            try:
                note = Note(
                    recipient_id= recipient_id, 
                    user_id = user.id,
                    body = data.get('body'),
                )    
                db.session.add(note)
                db.session.commit()
                return  make_response(note.to_dict(only=("id", "user_id", "recipient_id", "body")), 201)
            except Exception as e: 
                    traceback.print_exc() 
                    return {"error" : "whatever you want your message to be", "message": str(e)}, 500
api.add_resource(AddNotes, '/addnotes')            

if __name__ == '__main__':
    app.run(port=5555, debug=True)
