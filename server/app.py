#!/usr/bin/env python3

from flask import request, make_response, session, jsonify
from flask_restful import Resource
from flask_login import LoginManager, UserMixin, login_user, current_user, logout_user, login_required
from flask_migrate import Migrate
# Local imports
from config import app, db, api, migrate
#from models import User, Birthday, Gift, Recipient

login_manager = LoginManager()
#login_manager.init(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>The Happy Birthday Machine</h1>'







if __name__ == '__main__':
    app.run(port=5555, debug=True)
