# backend/routers/admin.py

from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.core.dependencies import get_db
from backend.dependencies.auth import require_admin
from backend.domain.models.user import User

router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)


@router.get("/users")
def get_all_users(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[User, Depends(require_admin)]
):
    return db.query(User).all()
