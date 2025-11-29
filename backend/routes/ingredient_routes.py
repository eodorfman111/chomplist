from flask import Blueprint, request, jsonify

ingredients_bp = Blueprint("ingredients", __name__)
ingredients = []

@ingredients_bp.get("/ingredients")
def get_ingredients():
    return jsonify(ingredients=ingredients), 200

@ingredients_bp.post("/ingredients")
def add_ingredient():
    data = request.get_json() or {}
    name = (data.get("name") or "").strip().lower()
    if not name:
        return jsonify(error="Ingredient name required"), 400
    if name not in ingredients:
        ingredients.append(name)
    return jsonify(ingredients=ingredients), 200

@ingredients_bp.delete("/ingredients/<name>")
def delete_ingredient(name):
    name = name.strip().lower()
    if name in ingredients:
        ingredients.remove(name)
    return jsonify(ingredients=ingredients), 200

