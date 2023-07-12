#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, date
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Note, Gift, Recipient

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Note.query.delete()
        Gift.query.delete()
        Recipient.query.delete()

        print("Seeding users...")
        users = [
        User(name="Matty B", username="Matty3000", email="matty3000@gmail.com" ),
        User(name="plzwork", username="plzplzplz", email="PLZWORK@PLZWORK")
        ]



        print("Seeding recipients...")
        recipients = [
        Recipient(name="Sarah", birthday=date(1991,10,10), user_id="1"),
        Recipient(name="Rachel", birthday=date(1992,4,20), user_id="2"),
        ]


        db.session.add_all(users)
        db.session.add_all(recipients)
        db.session.commit()
        print("Done!")