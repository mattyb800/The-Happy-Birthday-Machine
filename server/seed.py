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
        User(name="plzwork", username="plzplzplz", email="PLZWORK@PLZWORK"),
        User(name="Rocky", username="Rocky2000", email="Rocky2000@gmail.com")
        ]



        print("Seeding recipients...")
        recipients = [
        Recipient(name="Sarah", birthday=date(1991,10,10), user_id="1"),
        Recipient(name="Rachel", birthday=date(1992,4,20), user_id="2"),
        Recipient(name="Val", birthday=date(1994,11,11), user_id="3"),        ]

        print("Seeding gifts...")
        gifts = [
            Gift(description="Nintendo",user_id="1", recipient_id="2"),
            Gift(description="Book", user_id="1", recipient_id="1"),
            Gift(description="Shoes", user_id="1", recipient_id="3"),
            Gift(description="Bicycle",user_id="3", recipient_id="2"),
            Gift(description="Decorative Swords",user_id="3", recipient_id="1"),
            Gift(description="14 Dogs", user_id="2",recipient_id="2")

        ]


        db.session.add_all(users)
        db.session.add_all(recipients)
        db.session.add_all(gifts)
        db.session.commit()
        print("Done!")