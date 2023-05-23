from .db import db, add_prefix_for_prod, environment, SCHEMA

liked_posts = db.Table('liked_posts',
    db.Column('owner_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), primary_key=True)
)

if environment == "production":
    liked_posts.schema = SCHEMA