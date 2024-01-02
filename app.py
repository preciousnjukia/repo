from flask import Flask, make_response,request,jsonify
#importing flask_Restx because its a framework that will be  used to build the API
from flask_restx import Api, Resource, fields
from flask_migrate import Migrate
from flask_jwt_extended import (JWTManager, create_access_token, create_refresh_token,get_jwt_identity,jwt_required)
from werkzeug.security import generate_password_hash, check_password_hash
from config import DevConfig
from models import Courses,db,User
from flask_cors import CORS





app= Flask(__name__)
app.config.from_object(DevConfig)

CORS(app)

db.init_app(app)

migrate=Migrate(app,db)
JWTManager(app)
api=Api(app, docs='/docs')

#model serializer
Courses_model=api.model(
    'Course',{
        "id":fields.Integer(),
        "title":fields.String(),
        "description":fields.String()
        }
)

signup_model=api.model(
        'SignUp',
    {
        'username':fields.String(),
        'email':fields.String(),
        'password':fields.String()
    }
)

login_model=api.model(
    'Login',
    {
        'username':fields.String(),
        'password':fields.String()
    }
)
@api.route('/hello')
class HelloResource(Resource):
    def get(self):

        return{"message":"Hello World"}


@api.route('/signup')
class SignUp(Resource):
    @api.expect(signup_model)
    def post(self):
        data=request.get_json()


        username= data.get('username')
        db_user=User.query.filter_by(username=username).first()
        if db_user is not None:
            return jsonify({"message":f"User with username {username} already exists."})

        new_user=User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )

        new_user.save()
        return jsonify({"message":"User created successfully!"})
    

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        data=request.get_json()

        username=data.get('username')
        password=data.get('password')

        db_user=User.query.filter_by(username=username).first()
        if db_user and check_password_hash(db_user.password,password):
            access_token=create_access_token(identity=db_user.username)
            refresh_token=create_refresh_token(identity=db_user.username)


            return jsonify(
                {"access_token":access_token, "refresh_token":refresh_token}
            )
#to refresh the access token    
@api.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)

        return make_response(jsonify({"access_token": new_access_token}), 200)

    

@api.route('/Courses')
class CoursesResource(Resource):
    @api.marshal_list_with(Courses_model)
    def get(self):
        
        """Get all Courses"""
        courses=Courses.query.all()

        return courses
        
    @api.marshal_with(Courses_model)
    @api.expect(Courses_model)
    @jwt_required()
    def post(self):
        """Create a new course"""
        data = request.get_json()

        
        new_course= Courses(
            title=data.get("title"),
            description=data.get("description")

        )
        new_course.save()

        return {"message":"New Course Created"},201

        

@api.route('/Course/<int:id>')
class CourseResource(Resource):
    @api.marshal_with(Courses_model)
    def get(self,id):
        """Get a course by id"""
        course=Courses.query.get_or_404(id)
        return course
        
    @api.marshal_with(Courses_model)
    @jwt_required()
    def put(self,id):
        """Update a course by id"""

        course_to_update=Courses.query.get_or_404(id)
        data=request.get_json()
        course_to_update.update(data.get('title'),data.get('description'))

        return course_to_update



    @api.marshal_with(Courses_model)
    @jwt_required()
    def delete(self,id):
        """Delete a course by id"""
        course_to_delete=Courses.query.get_or_404(id)
        course_to_delete.delete()

        return course_to_delete

        








@app.shell_context_processor
def make_Shell_context():
    return{
        "db":"db",
        "Courses":"Courses"
    }




if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run()