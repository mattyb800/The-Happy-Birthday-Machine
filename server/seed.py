#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

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
        User(name="Matty B", username="Matty3000", email="matty3000@gmail.com" )
        ]



        print("Seeding recipients...")
        recipients = [
        Recipient(name="Sarah", birthday="1991/10/10")
        ]


        db.session.add_all(users)
        db.session.add_all(recipients)
        db.session.commit()
        print("Done!")