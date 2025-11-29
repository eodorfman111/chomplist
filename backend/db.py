import sqlite3
import csv
import os

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

def get_connection():
    return sqlite3.connect(DB_PATH)
