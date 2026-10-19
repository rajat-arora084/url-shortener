import os
from dotenv import load_dotenv
from fastapi import FastAPI
from psycopg_pool import ConnectionPool
from contextlib import asynccontextmanager
from psycopg.rows import dict_row


db_user = os.getenv("DATABASE_USERNAME")
db_pwd = os.getenv("DATABASE_PASSWORD")
db_name = os.getenv("DATABASE_NAME")
db_url = os.getenv("DATABASE_URL")

#print("db_url",load_dotenv())
load_dotenv(override=True)

DB_URI = f"postgresql://{db_user}:{db_pwd}@{db_url}/{db_name}"
pool = ConnectionPool(DB_URI, open=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    pool.open()  # Opens sync pool on startup
    yield
    pool.close() # Closes sync pool on shutdown


#  Just use a plain function with a yield statement
def get_db():
    with pool.connection() as conn:
        conn.row_factory = dict_row
        yield conn  # FastAPI automatically handles setup, injection, and teardown