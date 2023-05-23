from app.models import db, liked_posts, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want

def seed_liked_posts():
    liked_posts_data = [
        {'owner_id': 1, 'post_id': 1},
        {'owner_id': 1, 'post_id': 2},
        {'owner_id': 1, 'post_id': 3},
        {'owner_id': 2, 'post_id': 4},
        {'owner_id': 2, 'post_id': 5},
        {'owner_id': 3, 'post_id': 6}
    ]


    liked_posts_rows = []
    for data in liked_posts_data:
        liked_posts_rows.append(data)
    db.session.execute(liked_posts.insert().values(liked_posts_rows))
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_liked_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.liked_posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM liked_posts"))

    db.session.commit()