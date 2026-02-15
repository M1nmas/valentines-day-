from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from .db import users_collection, leaderboard_collection
import uuid

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"message": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

        if users_collection.find_one({"username": username}):
            return Response({"message": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = make_password(password)
        user_id = str(uuid.uuid4())
        users_collection.insert_one({
            "user_id": user_id,
            "username": username,
            "password": hashed_password
        })

        return Response({"message": "User registered successfully", "username": username}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = users_collection.find_one({"username": username})
        if not user or not check_password(password, user['password']):
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({"message": "Login successful", "username": username}, status=status.HTTP_200_OK)

class LeaderboardView(APIView):
    def get(self, request):
        # Top 10 scores, sorted descending
        scores = leaderboard_collection.find({}, {"_id": 0}).sort("score", -1).limit(10)
        return Response([score for score in scores], status=status.HTTP_200_OK)

class SubmitScoreView(APIView):
    def post(self, request):
        username = request.data.get('username')
        score = request.data.get('score')
        
        if not username or score is None:
             return Response({"message": "Username and score required"}, status=status.HTTP_400_BAD_REQUEST)

        # Update high score if new score is higher
        existing_entry = leaderboard_collection.find_one({"username": username})
        
        if existing_entry:
            if score > existing_entry['score']:
                leaderboard_collection.update_one(
                    {"username": username},
                    {"$set": {"score": score}}
                )
        else:
            leaderboard_collection.insert_one({
                "username": username,
                "score": score
            })

        return Response({"message": "Score updated"}, status=status.HTTP_200_OK)
