import os
from dotenv import load_dotenv
from fastapi import FastAPI
from psycopg_pool import ConnectionPool
from contextlib import asynccontextmanager
from psycopg.rows import dict_row

load_dotenv(override=True)

DB_URI = os.getenv("DB_URI")
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