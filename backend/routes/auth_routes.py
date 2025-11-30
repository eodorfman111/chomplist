from flask import Blueprint, request, jsonify
from db import create_user, verify_user, get_user_by_username

auth = Blueprint("auth", __name__)


@auth.post("/register")
def register(): #Tried to improve username and password stuff for saving favorites
    data = request.get_json() or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify(error="Username and password required"), 400

    existing = get_user_by_username(username)
    if existing:
        return jsonify(error="Username already exists"), 409

    user_id = create_user(username, password)
    if not user_id:
        return jsonify(error="Could not create user"), 500

    return jsonify(message="User created", user={"id": user_id, "username": username}), 201


@auth.post("/login")
def login():
    data = request.get_json() or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify(error="Username and password required"), 400

    if verify_user(username, password):
        return jsonify(message="Login successful", user=username), 200
    else:
        return jsonify(error="Invalid credentials"), 401
