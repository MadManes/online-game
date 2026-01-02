# backend/routers/users.py

from typing import Annotated
from fastapi import APIRouter, Depends
from backend.schemas.user import UserOut
from backend.dependencies.auth import get_current_active_user
from backend.domain.models.user import User

router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.get("/me", response_model=UserOut)
def read_current_user(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user
