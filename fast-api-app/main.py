import os
from dotenv import load_dotenv
from fastapi import FastAPI, Body, Depends, HTTPException
from fastapi.responses import JSONResponse,RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.services.generate_controller import generate_short_url,fetch_actual_url,check_if_url_exists, encode
from app.core.db import lifespan, get_db

app = FastAPI(lifespan=lifespan)

react_app_url = os.getenv("REACT_API_URL")
fast_api_url = os.getenv("FAST_API_URL")
print("reac",react_app_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[react_app_url],            # Allows specific origins
    allow_credentials=False,           # Allows cookies and credentials headers
    allow_methods=["GET", "POST"],              # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],              # Allows all headers
)

@app.post("/generate")
def generate_url(long_url: str = Body(), db= Depends(get_db)):
    print("generate",long_url)

    long_url_exists = check_if_url_exists(long_url,db)
    print("27",long_url_exists)

    if(long_url_exists):
        print("f",fast_api_url)
        short_url = fast_api_url + "/" + encode(long_url_exists["url_id"])
        print("short url",short_url,long_url)
        return JSONResponse(
            status_code=409,
            content={
                "message": "Long url already exists!",
                "short_url": short_url,
                "long_url": long_url
            }
        )
    print("41")
    short_url = generate_short_url(long_url,db)
    return JSONResponse(
        status_code=201,
        headers={"Content-Type": "application/json"}, # Force preview recognition
        content={
            "message": "Shor url successfully generated.",
            "short_url": short_url,
            "long_url": long_url
        }
    )


@app.post("/verify")
def verify_url(short_url: str = Body(), db= Depends(get_db)):
    try:
        print("short url",short_url)
        long_url = fetch_actual_url(short_url,db)
        print("lng ", long_url)

        if(long_url):
            return JSONResponse(
                status_code=200,
                content={
                    "message": "Short url: %s exists" % short_url,
                    "short_url": short_url,
                    "actual_url": long_url
                    }
                )
        else:
            raise Exception()
    except:
        raise HTTPException(
            status_code=404, 
            detail="Short url not found"
        )

@app.get("/{short_url}")
def redirect_url(short_url:str, db=Depends(get_db)):
    long_url = fetch_actual_url(short_url,db)
    print("lu", long_url)
    if(long_url):
        return RedirectResponse(url=long_url, status_code=302)
    else:
        return JSONResponse(
            status_code=404,
            content={
                "message": "Short URL does not exist in system.",
                "short_url": fast_api_url + "/" + short_url
            }
        )


    

# This blocks ensures it only runs if you execute this file directly
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=5000, reload=True)