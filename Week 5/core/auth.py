from fastapi import FastAPI, Depends, Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional

#Simple token storage (in production, use a databse)
VALID_TOKENS = {
    "user123": {"username": "Sharon June Martin", "role": "user"},
    "admin456": {"username": "admin_user", "role": "admin"}

}

#Security scheme
security = HTTPBearer()
app = FastAPI()

async def auth_dependency(request: Request, credentials:
HTTPAuthorizationCredentials = Depends(security)):
    """Basic authentication dependency"""
    token = credentials.credentials

    #Check if token exists in our "database"
    if token not in VALID_TOKENS:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user_info = VALID_TOKENS[token]
    print(f"Auth middleware executed for user: {user_info['username']}")

    #Return user info instead of just "authenticated"
    return user_info

async def admin_dependency(request: Request, user_info: dict = Depends(auth_dependency)):
    """Admin-specific dependecy that requires authentication first"""

    #Check if user has admin role
    if user_info.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    print(f"Admin middleware executed for: {user_info['username']}")
    return user_info