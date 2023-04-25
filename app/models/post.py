from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.String(), nullable=False)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))

    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')


    def to_dict(self):
        return {
            'id': self.id,
            'post': self.post,
            'owner_id': self.owner_id
        }
