from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        firstname='Sadiq',
        lastname='Ahmed',
        profileImage='https://avatars.githubusercontent.com/u/43020644?v=4',
        headerImage='https://media.licdn.com/dms/image/D5616AQGsKsXOUZpG8A/profile-displaybackgroundimage-shrink_350_1400/0/1679370776923?e=1692835200&v=beta&t=n5U81EmGbg8Jhng5neUmt2yhJ4voAhs3dUlqpRz17sA',
        email='demo@aa.io',
        password='password',
        occupation='Software Engineer',
        location='Dallas, TX',
        about="Hi there! I'm a full stack developer based in Dallas Texas. I've recently graduated from AppAcademy, where I gained a solid foundation in programming languages & frameworks such as JavaScript, Python, HTML, CSS, React.js, Redux, Node.js, SQL & more. Aside from my technical skills, I pride myself on my strong communication skills as I know that these soft skills are just as important as my technical abilities. I'm truly passionate about technology and dedicated to continuous learning. I'm excited to see where my career as a full stack developer takes me, and I can't wait to continue to grow and develop my skills in this field."
        )

    Mukul = User(
        firstname='Mukul',
        lastname='Kumar',
        profileImage='https://media.licdn.com/dms/image/C4E03AQFU6hVw0nAVhg/profile-displayphoto-shrink_400_400/0/1624050147717?e=1692835200&v=beta&t=DrbFpKXUbRBDycnuijy1oRnN09sE2MKiV5s4uZMbKrc',
        headerImage='https://media.licdn.com/dms/image/C4E16AQEFZAG-kM56CA/profile-displaybackgroundimage-shrink_350_1400/0/1594460251440?e=1692835200&v=beta&t=Ij7sI1_7bp_O7N3aEBWp5Wpq7OWJc_SJv7nqzDlGT-U',
        email='Mukul@aa.io',
        password='password',
        occupation='Software Engineer',
        location='Seattle, WA',
        about='SDE @Amazon | GSoC @RedHat | Open Source and Coding Mentor |Ex @Nagarro|Ex @Coding Blocks|System Design Content Creator|15k+ linkedin followers|3 million views'
        )

    Vikas = User(
        firstname='Vikas',
        lastname='Rajput',
        profileImage='https://media.licdn.com/dms/image/C4D03AQGAIpQDrF_7Ww/profile-displayphoto-shrink_400_400/0/1661682982732?e=1692835200&v=beta&t=hHb2b2c28qbZ5hGt_mFTQ2yd__xaXtHJe6la0MAb4_0',
        headerImage='https://media.licdn.com/dms/image/C4D16AQHEd3t0SWFUIA/profile-displaybackgroundimage-shrink_350_1400/0/1663205772690?e=1692835200&v=beta&t=KQrBxbBAXUDwTwzeVetDuAv1EAaa_16pi4kd7nu6p7g',
        email='Vikas@aa.io',
        password='password',
        occupation='Backend Engineer',
        location='San Francisco, CA',
        about='• Sr. Backend Developer • Simplifying Backend and Sharing What I Learn Along the Way •'
        )
    
    Nelson = User(
        firstname='Nelson',
        lastname='Djalo',
        profileImage='https://media.licdn.com/dms/image/D4E03AQGXYVCAumqo2A/profile-displayphoto-shrink_400_400/0/1674171386031?e=1692835200&v=beta&t=7O2EFrH6NvFE2JQrX5Cftw9RDg97mCtasd1jGrHSD_o',
        headerImage='https://media.licdn.com/dms/image/D4E16AQHqY6qccjRprw/profile-displaybackgroundimage-shrink_350_1400/0/1674169372916?e=1692835200&v=beta&t=2JJPAI4hucPipTYR6K_KStDB24JmhXr8xnbYkU4SpWQ',
        email='Nelson@aa.io',
        password='password',
        occupation='DevOps',
        location='London, England',
        about='🚀 Founder of Amigoscode | Helping millions of people break into Software Engineering and DevOps 🤝| 500K Community'
        )
    
    Awais = User(
        firstname='Awais',
        lastname='Khan',
        profileImage='https://media.licdn.com/dms/image/C5603AQEnKhSfLwPf9Q/profile-displayphoto-shrink_400_400/0/1654850930836?e=1692835200&v=beta&t=xiOYEORVTlp2D6xG7Dkq_IlVzoVWe2zFygCPZxB_WmU',
        headerImage='https://media.licdn.com/dms/image/D4E16AQFxmqWX99JO_Q/profile-displaybackgroundimage-shrink_350_1400/0/1679040034343?e=1692835200&v=beta&t=3alntSlMwOVPLu3UrKVYJymFvYIJR7QzzzKGREN5w4s',
        email='Awais@aa.io',
        password='password',
        occupation='Coach',
        location='Dubai, United Arab Emirates',
        about='Follow me to get smart on AI and learn how you can use it to boost your productivity. Join my free AI newsletter read by 300k+ people at companies like Apple, Google, Amazon, and more ↓'
        )
    
    Lara = User(
        firstname='Lara',
        lastname='Acosta',
        profileImage='https://media.licdn.com/dms/image/D4E03AQEfwO2tv6ef4A/profile-displayphoto-shrink_400_400/0/1686093440568?e=1692835200&v=beta&t=LKg2uaL__T_SL2WnfnrsF6KEY377Qs4w5jGA3ui5EfA',
        headerImage='https://media.licdn.com/dms/image/D4E16AQGmXTMzwg3FDA/profile-displaybackgroundimage-shrink_350_1400/0/1682028508454?e=1692835200&v=beta&t=RdgoWlWdRx8RPxFgMZDFeSBVmNplnkESEYVjkQLoGx8',
        email='Lara@aa.io',
        password='password',
        occupation='Coach',
        location='Exeter, England, United Kingdom',
        about='Helping personal brands grow on LinkedIn (and beyond) | Founder at LA Digital |'
        )
    db.session.add(demo)
    db.session.add(Mukul)
    db.session.add(Vikas)
    db.session.add(Nelson)
    db.session.add(Awais)
    db.session.add(Lara)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
