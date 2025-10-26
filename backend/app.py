from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

app.register_blueprint(auth, url_prefix="/api")

@app.get("/api/healthz")
def health_check():
    return {"ok": True}

if __name__ == "__main__":
    app.run(port=5001, debug=True)