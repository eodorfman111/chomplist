from flask import Blueprint, request, jsonify

auth = Blueprint("auth", __name__)

users = {}

@auth.post("/signup")
def signup():
    data = request.get_json() or {}
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify(error="All fields required"), 400
    
    if email in users:
        return jsonify(error="Email already in use."), 400
    
    users[email] = {"username": username, "password": password}
    return jsonify(message="Signup successful", user=username)

@auth.post("/login")
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify(error="Email and password required"), 400
    
    if email not in users:
        return jsonify(error="User not found."), 400
    
    if users[email]["password"] != password:
        return jsonify(error="Incorrect password. Please try again."), 400

    return jsonify(message="Login successful", user=users[email]["username"]), 200