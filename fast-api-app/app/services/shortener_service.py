import os
from dotenv import load_dotenv
import string
from typing import Optional, Union

fast_api_url = os.getenv("FAST_API_URL")


# Define the standard 62-character alphabet
BASE62_ALPHABET = string.digits + string.ascii_lowercase + string.ascii_uppercase

def generate_short_url(actual_url: str,db) -> str:

    row_id = insert_long_url_in_db(actual_url,db)
    return fast_api_url + "/" + encode(row_id)


def insert_long_url_in_db(actual_url:str,db) -> int:
        
    res = db.execute("INSERT INTO url_id_mapping(actual_url) VALUES(%s) RETURNING *", (actual_url,))
    return res.fetchone()["url_id"]

def check_if_url_exists(verify_url: str,db) -> Union[str,None]:
    try:
        k = verify_existence_of_url(verify_url,db)
        print("k",k)
        return k
    except Exception as e:
        print("error",e)
        return None

def verify_existence_of_url(verify_url: str,db) -> str:
    return db.execute("SELECT * FROM url_id_mapping where actual_url like %s", (verify_url,)).fetchone()


def fetch_actual_url(tiny_url:str, db) -> str:
    try:
        encoded_url = tiny_url.split("/")[-1]
        row_id = decode(encoded_url)
        print("row id",row_id)
        db_row = db.execute("SELECT * FROM url_id_mapping where url_id = %s", (row_id,)).fetchone()
        print("db row",db_row)
        if(db_row):
            return db_row["actual_url"]
        return
    except Exception as e:
        print("error",e)
        return


def encode(num: int) -> str:
    """Encodes a positive integer into a Base62 string."""
    if num == 0:
        return BASE62_ALPHABET[0]
    
    arr = []
    base = len(BASE62_ALPHABET)
    print("37")
    while num > 0:
        num, rem = divmod(num, base)
        arr.append(BASE62_ALPHABET[rem])
        print(num)
    print("40", arr)
    return ''.join(reversed(arr))

def decode(string_val: str) -> int:
    """Decodes a Base62 string back into an integer."""
    base = len(BASE62_ALPHABET)
    num = 0
    print("here")
    
    for idx, char in enumerate(string_val):
        power = len(string_val) - idx - 1
        num += BASE62_ALPHABET.index(char) * (base ** power)
        print(idx)
    print("num",num)
    return num
