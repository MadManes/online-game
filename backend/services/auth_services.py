# app/services/auth_service.py

from datetime import timedelta
from sqlalchemy.orm import Session
from backend.repositories.user_repository import UserRepository
from backend.core.security import (
    verify_password,
    create_access_token,
    hash_password
)
from backend.domain.models.user import User

class AuthService:

    @staticmethod
    def authenticate(
        db: Session,
        username: str,
        password: str
    ) -> User | None:
        user = UserRepository.get_by_username(db, username)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    @staticmethod
    def login(
        db: Session,
        username: str,
        password: str
    ) -> str | None:
        user = AuthService.authenticate(db, username, password)
        if not user:
            return None

        return create_access_token(
            username=user.username,
            user_id=user.id,
            role=user.role,
            expires_delta=timedelta(minutes=20)
        )

    @staticmethod
    def create_user(db: Session, data) -> None:
        user = User(
            username=data.username,
            email=data.email,
            first_name=data.first_name,
            last_name=data.last_name,
            role=data.role,
            hashed_password=hash_password(data.password),
            is_active=True
        )
        UserRepository.create(db, user)
