import sqlite3
import csv
import os
from werkzeug.security import generate_password_hash, check_password_hash

BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "recipes.db")
CSV_PATH = os.path.join(BASE_DIR, "recipes.csv")

#creates the database
def create_database():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY,
            name TEXT,
            ingredients TEXT,
            instructions TEXT
        )
    """)

    # users table for simple authentication
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # favorites table: links users to recipes
    cur.execute("""
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL,
            recipe_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, recipe_id),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(recipe_id) REFERENCES recipes(id)
        )
    """)

    conn.commit()
    conn.close()

#inserts CSV data into the database
def insert_csv_data():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    with open(CSV_PATH, "r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            ingredients = row["Ingredients"].lower()
            cur.execute(
                """
                INSERT OR IGNORE INTO recipes (name, ingredients, instructions)
                VALUES (?, ?, ?)
                """,
                (row["Title"], ingredients, row["Instructions"]),
            )

    conn.commit()
    conn.close()

#Backend stuff to make user

def create_user(username: str, password: str):
    #Create a new user with a hashed password. 
    #Tries to return new ID, though if error return that instead
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    password_hash = generate_password_hash(password)
    try:
        cur.execute(
            """
            INSERT INTO users (username, password_hash)
            VALUES (?, ?)
            """,
            (username, password_hash),
        )
        conn.commit()
        user_id = cur.lastrowid
    except sqlite3.IntegrityError:
        user_id = None
    conn.close()
    return user_id


def get_user_by_username(username: str):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        "SELECT id, username, password_hash, created_at FROM users WHERE username = ?",
        (username,)
    )
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    return {
        "id": row[0],
        "username": row[1],
        "password_hash": row[2],
        "created_at": row[3],
    }


def verify_user(username: str, password: str) -> bool:
    user = get_user_by_username(username)
    if not user:
        return False
    return check_password_hash(user["password_hash"], password)


def add_favorite(user_id: int, recipe_id: int):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)",
            (user_id, recipe_id),
        )
        conn.commit()
        fav_id = cur.lastrowid
    except sqlite3.IntegrityError:
        fav_id = None
    conn.close()
    return fav_id


def remove_favorite_by_id(fav_id: int) -> bool:
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("DELETE FROM favorites WHERE id = ?", (fav_id,))
    changed = cur.rowcount
    conn.commit()
    conn.close()
    return changed > 0


def remove_favorite(user_id: int, recipe_id: int) -> bool:
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?", (user_id, recipe_id))
    changed = cur.rowcount
    conn.commit()
    conn.close()
    return changed > 0


def get_favorites_by_user(user_id: int, limit: int = 50, offset: int = 0):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        """
        SELECT f.id, f.recipe_id, r.name, r.ingredients, r.instructions, f.created_at
        FROM favorites f
        JOIN recipes r ON r.id = f.recipe_id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC
        LIMIT ? OFFSET ?
        """,
        (user_id, limit, offset),
    )
    rows = cur.fetchall()
    conn.close()
    return [
        {
            "favorite_id": row[0],
            "recipe_id": row[1],
            "title": row[2],
            "ingredients": row[3],
            "instructions": row[4],
            "created_at": row[5],
        }
        for row in rows
    ]

def get_connection():
    return sqlite3.connect(DB_PATH)

