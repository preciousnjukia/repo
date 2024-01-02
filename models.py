#so for this project there are 3 models (to be added after discussions)
#ie user, courses, lesson


from flask_sqlalchemy import SQLAlchemy

#creating the db instance
db=SQLAlchemy()

#starting with the courses model
"""
class Courses:
    id: int primary key
    title: str
    description: str(text)
    duration: int 
    difficulty: str
    date_added: datetime
    start_date: datetime
    end_date: datetime

"""

class Courses(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    title=db.Column(db.String(),nullable=False)
    description=db.Column(db.Text(), nullable=False)
    #duration=db.Column(db.Float())
    #difficulty=db.Column(db.Enum("Beginner","Intermediate","Advanced"))
    #start_date = db.Column(db.DateTime())
    #end_date = db.Column(db.DateTime())
    #date_added = db.Column(db.DateTime(), default=db.func.now())

    #creating convenience methods
    def __repr__(self):
        return f",Course {self.title}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self,title,description):
        self.title=title
        self.description=description
        db.session.commit()
        

"""
class User:
    id: integer
    username: string
    email:string
    password:string          
"""

#implementing this model:
class User(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    username=db.Column(db.String(25), nullable=False, unique=True)
    email=db.Column(db.String(80), nullable=False)
    password=db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User{self.username}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
