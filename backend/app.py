from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth
from routes.ingredient_routes import ingredients_bp
from db import create_database, insert_csv_data

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

create_database()
insert_csv_data()

app.register_blueprint(auth, url_prefix="/api")
app.register_blueprint(ingredients_bp, url_prefix="/api")

@app.get("/api/healthz")
def health_check():
    return {"ok": True}

if __name__ == "__main__":
    app.run(port=5001, debug=True)