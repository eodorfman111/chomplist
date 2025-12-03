import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from pathlib import Path

from db import (
    create_database,
    insert_csv_data,
    get_all_recipes,
    get_recipe_by_id,
    search_recipes_by_ingredients,
)

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "recipes.db"
CSV_PATH = BASE_DIR / "recipes.csv"

def create_app():
    app = Flask(__name__)

    CORS(
        app,
        resources={r"/api/*": {"origins": [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]}},
    )

    if not DB_PATH.exists():
        print("Database not found, creating and loading from CSV...")
        create_database(DB_PATH)
        if CSV_PATH.exists():
            insert_csv_data(DB_PATH, CSV_PATH)
        else:
            print(f"WARNING: CSV file not found.")
    else:
        print("Database already exists, skipping creation.")

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"}), 200

    @app.route("/api/recipes", methods=["GET"])
    def list_recipes():
        recipes = get_all_recipes(DB_PATH)
        return jsonify(recipes), 200

    @app.route("/api/recipes/<int:recipe_id>", methods=["GET"])
    def recipe_detail(recipe_id):
        recipe = get_recipe_by_id(DB_PATH, recipe_id)
        if recipe is None:
            return jsonify({"error": "Recipe not found"}), 404
        return jsonify(recipe), 200

    @app.route("/api/recipes/search", methods=["POST"])
    def search_recipes():
        data = request.get_json(silent=True) or {}
        ingredients = data.get("ingredients", [])
        if not isinstance(ingredients, list):
            return jsonify({"error": "ingredients must be a list"}), 400

        recipes = search_recipes_by_ingredients(DB_PATH, ingredients)
        return jsonify(recipes), 200

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5001, debug=True)
