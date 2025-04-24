from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB configuration
mongo = PyMongo()

def init_db(app):
    # Change the default database name from 'abdos' to 'myDatabaseName'
    default_uri = "mongodb://localhost:27017/myDatabaseName"
    app.config["MONGO_URI"] = os.getenv("MONGODB_URI", default_uri)
    print(f"Connecting to MongoDB URI: {app.config['MONGO_URI']}") # Log the URI being used
    mongo.init_app(app)
    return mongo 