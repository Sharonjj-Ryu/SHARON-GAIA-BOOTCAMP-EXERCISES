# main.py
from fastapi import FastAPI, Depends
from auth import auth_dependency, admin_dependency  # <-- Import from core folder

app = FastAPI()

# Public endpoint
@app.get("/public")
async def public_endpoint():
    return {"message": "Public endpoint - no auth required"}

# Protected endpoint
@app.get("/protected")
async def protected_endpoint(user_info: dict = Depends(auth_dependency)):
    return {
        "message": "Protected endpoint",
        "user": user_info["username"],
        "role": user_info["role"]
    }

# Admin endpoint
@app.get("/admin")
async def admin_endpoint(user_info: dict = Depends(admin_dependency)):
    return {
        "message": "Admin endpoint",
        "user": user_info["username"],
        "role": user_info["role"]
    }