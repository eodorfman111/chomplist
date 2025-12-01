import sqlite3
from pathlib import Path
import pandas as pd


def create_database(db_path: Path):
    """Create the SQLite DB and a basic recipes table if not exists."""
    db_path = Path(db_path)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY,
            name TEXT,
            ingredients TEXT,
            instructions TEXT
        );
        """
    )

    conn.commit()
    conn.close()


def insert_csv_data(db_path: Path, csv_path: Path):
    """Insert CSV data into DB only if table is empty."""
    db_path = Path(db_path)
    csv_path = Path(csv_path)

    if not csv_path.exists():
        print(f"CSV not found at {csv_path}, skipping insert.")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # check if table has any rows already
    cursor.execute("SELECT COUNT(*) FROM recipes;")
    (count,) = cursor.fetchone()
    if count > 0:
        print("recipes table already has data, skipping CSV import.")
        conn.close()
        return

    df = pd.read_csv(csv_path)

    # assume df has columns: id, name, ingredients, instructions
    for _, row in df.iterrows():
        cursor.execute(
            """
            INSERT INTO recipes (id, name, ingredients, instructions)
            VALUES (?, ?, ?, ?)
            """,
            (
                int(row["id"]),
                row.get("name", ""),
                row.get("ingredients", ""),
                row.get("instructions", ""),
            ),
        )

    conn.commit()
    conn.close()
    print("CSV data imported successfully.")


def get_all_recipes(db_path: Path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, ingredients, instructions FROM recipes;")
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "id": r[0],
            "name": r[1],
            "ingredients": r[2],
            "instructions": r[3],
        }
        for r in rows
    ]


def get_recipe_by_id(db_path: Path, recipe_id: int):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, name, ingredients, instructions FROM recipes WHERE id = ?;",
        (recipe_id,),
    )
    row = cursor.fetchone()
    conn.close()

    if row is None:
        return None

    return {
        "id": row[0],
        "name": row[1],
        "ingredients": row[2],
        "instructions": row[3],
    }


def search_recipes_by_ingredients(db_path: Path, ingredients: list[str]):
    """Very simple search: all ingredients must be substring-matched in ingredients column."""
    if not ingredients:
        return []

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # build LIKE clauses
    clauses = []
    params = []
    for ing in ingredients:
        clauses.append("ingredients LIKE ?")
        params.append(f"%{ing}%")

    where_clause = " AND ".join(clauses)
    query = f"""
        SELECT id, name, ingredients, instructions
        FROM recipes
        WHERE {where_clause};
    """

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "id": r[0],
            "name": r[1],
            "ingredients": r[2],
            "instructions": r[3],
        }
        for r in rows
    ]
