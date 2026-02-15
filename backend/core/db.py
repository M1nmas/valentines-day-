from pymongo import MongoClient
from django.conf import settings

def get_db():
    client = MongoClient(settings.MONGO_URI)
    return client[settings.MONGO_DB_NAME]

db = get_db()
users_collection = db["users"]
leaderboard_collection = db["leaderboard"]
