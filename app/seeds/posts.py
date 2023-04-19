from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():

    post1 = Post(
        post='Today was a fun day working on capstones.',
        owner_id=1
        )
    post2 = Post(
        post='Starting a new position YALLLLL!',
        owner_id=1
        )
    post3 = Post(
        post='Feeling a bit down today can really use some motivation today 😪.',
        owner_id=1
        )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
