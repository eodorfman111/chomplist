from flask import Blueprint, request, jsonify
from db import get_user_by_username, add_favorite, remove_favorite_by_id, remove_favorite, get_favorites_by_user, get_connection

favorites_bp = Blueprint("favorites", __name__)


@favorites_bp.get("/favorites")
def list_favorites():
    username = request.args.get("username")
    limit = int(request.args.get("limit", 50))
    offset = int(request.args.get("offset", 0))

    if not username:
        return jsonify(error="username query parameter required"), 400

    user = get_user_by_username(username)
    if not user:
        return jsonify(error="user not found"), 404

    favs = get_favorites_by_user(user["id"], limit=limit, offset=offset)
    return jsonify(favorites=favs), 200


@favorites_bp.post("/favorites")
def create_favorite():
    data = request.get_json() or {}
    username = (data.get("username") or "").strip()
    recipe_id = data.get("recipe_id")

    if not username or not recipe_id:
        return jsonify(error="username and recipe_id are required"), 400

    user = get_user_by_username(username)
    if not user:
        return jsonify(error="user not found"), 404

    # hey is the recipe real?
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id FROM recipes WHERE id = ?", (recipe_id,))
    if not cur.fetchone():
        conn.close()
        return jsonify(error="recipe not found"), 404
    conn.close()

    fav_id = add_favorite(user["id"], recipe_id)
    if not fav_id:
        return jsonify(error="favorite already exists or could not be created"), 409

    return jsonify(message="favorite created", favorite_id=fav_id), 201


@favorites_bp.delete("/favorites/<int:fav_id>")
def delete_favorite(fav_id):
    success = remove_favorite_by_id(fav_id)
    if not success:
        return jsonify(error="favorite not found"), 404
    return jsonify(message="favorite deleted"), 200


@favorites_bp.delete("/favorites")
def delete_favorite_by_recipe():
    username = (request.args.get("username") or "").strip()
    recipe_id = request.args.get("recipe_id")

    if not username or not recipe_id:
        return jsonify(error="username and recipe_id query params required"), 400

    user = get_user_by_username(username)
    if not user:
        return jsonify(error="user not found"), 404

    success = remove_favorite(user["id"], int(recipe_id))
    if not success:
        return jsonify(error="favorite not found"), 404

    return jsonify(message="favorite deleted"), 200
