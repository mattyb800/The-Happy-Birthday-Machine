#!/usr/bin/env python3

from flask import request, make_response, session, jsonify
from flask_restful import Resource
from flask_login import LoginManager, UserMixin, login_user, current_user, logout_user, login_required
from flask_migrate import Migrate
# Local imports
from config import app, api, db
from models import User, Recipient, Note, Gift
 

login_manager = LoginManager()

login_manager.init_app(app)
app.secret_key = b'\x1d"\xc3\xbf\xccS\xa8\t\xff1\xe7\xc0\x07ydx'

# Views go here!

@app.route('/')
def index():
    return '<h1>The Happy Birthday Machine</h1>'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

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
        session['user_id'] = new_user.id
        return make_response(new_user.to_dict(), 201)


api.add_resource(Signup, '/signup')    

    


#----------LOGIN-----------#
class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username = data.get('username')).first()
        password = request.get_json()['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        
        return{'Invalid Username/Password'}, 401


api.add_resource(Login, '/login')

#----------AUTHORIZED SESSION-----------#
class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(
                id = session.get('user_id')).first()
            return make_response(user.to_dict(), 200)
        except:
            return make_response({'message': 'Must Log In'}, 401)

api.add_resource(AuthorizedSession, '/authorize_session')

#----------LOGOUT------------#
class Logout(Resource):
    def get(self):
        session['user_id'] = None
        return make_response('Successfully Logged Out', 204)

api.add_resource(Logout, '/logout')

#-----------USER VIEWS--------------#
class CurrentUser(Resource):
    @login_required
    def get(self, username):
            user = User.query.filter(User.username == username).first()
            if not user:
                return make_response("User Not Found", 404)
            return make_response(user.to_dict(),200)
    @login_required
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
   #@login_required
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
    
    

    
api.add_resource(Recipients, '/users/<string:username>/recipients')  


class Notes(Resource):
   # @login_required
    def get(self, username):
        user = User.query.filter(User.username == username).first()
        if user:
            notes = []
            for note in user.notes:
                notes_list = note.to_dict()
                notes.append(notes_list)
            return make_response( notes, 200)
        if not user:
            return make_response("Not Found", 404)

api.add_resource(Notes, '/<string:username>/notes') 

class Gifts(Resource):
    @login_required
    def get(self, username):
        user = User.query.filter(User.username == username).first()
        if user:
            gifts = []
            for gift in user.gifts:
                gifts_list = gifts.to_dict()
                gifts.append(gifts_list)
            return make_response( gifts, 200)
        if not user:
            return make_response("Not Found", 404)

api.add_resource(Gifts, '/<string:username>/gifts')


#----------RECIPIENT VIEWS--------------#
class OneRecipient(Resource):
   #@login_required
   def post(self):
        data = request.get_json()
        user = current_user
        if user:
            try:
                new_recipient = Recipient(
                    user_id = user.id,
                    name = data.get('name'),
                    birthday = data.get('birthday'))
                db.session.add(new_recipient)
                db.session.commit()
            except:
                return make_response("Could not add recipient", 400)

            return make_response(new_recipient.to_dict(), 200) 

        if not user:
            return make_response("Gotta Log In", 404) 
        


api.add_resource(OneRecipient, '/recipient'  )     
#-----------NOTES------------------------#
@app.route('/users/<string:username>/addnotes', methods=['POST'])
def addNotes(username):
    data = request.get_json()
    user = current_user
    try:
        new_note = Note(
        user = data.get('user'),    
        body = data.get('body'),

            )
        db.session.add(new_note)
        db.session.commit()
    except:
        return make_response("Could not add note", 400)
    dict = new_note.to_dict()
    return make_response(jsonify(dict), 201)    
            

if __name__ == '__main__':
    app.run(port=5555, debug=True)
