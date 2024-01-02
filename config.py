#This file will have all the configurations for the API. 
#Within this we will have the configurations for the application.

from decouple import config
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))



class Config:
    SECRET_KEY = config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS=config('SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool)

    #copy this part for SQLALCHEMY_TRACK_MODIFICATIONS and paste it in the .env file and equate it to false. So that decouple will read this and cast it into our boolean



#then we create a development config that inherits from the global config
    
class DevConfig(Config):
    #setting the specific considerations for our development
    #Our database_uri is going to be the connection string of the database we are going to use
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, 'dev.db')



    #Next thing is to set the debug variable to true this enables us to be able to access exceptions in the frontend, to see every error that we have and also to also run our server with reloading

    DEBUG= True
    #This helps us to see the generated sql commands every time we carry out the database transactions
    SQLALCHEMY_ECHO= True
    


class ProdConfig(Config):
    pass

class TestConfig(Config):
    pass

