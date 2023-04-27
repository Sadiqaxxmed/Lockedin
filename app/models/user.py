from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    occupation = db.Column(db.String(40), nullable=False)
    profileImage = db.Column(db.String(), nullable=False)
    headerImage = db.Column(db.String(), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'profileImage': self.profileImage,
            'headerImage': self.headerImage,
            'email': self.email,
            'occupation': self.occupation
        }
