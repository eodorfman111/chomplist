from flask import Blueprint, request, jsonify

auth = Blueprint("auth", __name__)

@auth.post("/login")
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify(error="Username and password required"), 400

    return jsonify(message="Login successful", user=username), 200