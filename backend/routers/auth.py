# backend/routers/auth.py

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.core.dependencies import get_db
from backend.core.security import decode_token
from backend.services.auth_services import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/token")

class CreateUserRequest(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    password: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(
    data: CreateUserRequest,
    db: Annotated[Session, Depends(get_db)]
):
    AuthService.create_user(db, data)

@router.post("/token", response_model=Token)
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[Session, Depends(get_db)]
):
    token = AuthService.login(
        db,
        form_data.username,
        form_data.password
    )
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
