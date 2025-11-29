from flask import Blueprint, request, jsonify
from db import get_connection

suggestions_bp = Blueprint("suggestions", __name__)

@suggestions_bp.post("/suggestions")
def get_suggestions():
    data = request.get_json() or {}
    ingredients = data.get("ingredients") or []
    limit = data.get("limit", 10)
    offset = data.get("offset", 0)

    if not ingredients:
        return jsonify(error="Ingredients list is required"), 400

    # Normalize ingredients
    ingredients_str = [f"%{ing.strip().lower()}%" for ing in ingredients if str(ing).strip()]

    if not ingredients_str:
        return jsonify(error="At least one valid ingredient is required"), 400

    conn = get_connection()
    cur = conn.cursor()

    where_clause = " AND ".join(["LOWER(ingredients) LIKE ?"] * len(ingredients_str))
    query = f"""
        SELECT id, name, ingredients, instructions
        FROM recipes
        WHERE {where_clause}
        LIMIT ? OFFSET ?
    """

    cur.execute(query, ingredients_str + [limit, offset])
    rows = cur.fetchall()
    conn.close()

    recipes = [
        {
            "id": row[0],
            "title": row[1],
            "ingredients": row[2],
            "instructions": row[3],
        }
        for row in rows
    ]

    return jsonify(results=recipes), 200