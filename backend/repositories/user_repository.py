# app/repositories/user_repository.py

from sqlalchemy.orm import Session
from backend.domain.models.user import User

class UserRepository:

    @staticmethod
    def get_by_username(db: Session, username: str) -> User | None:
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_by_id(db: Session, user_id: int) -> User | None:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def create(db: Session, user: User) -> None:
        db.add(user)
        db.commit()
        db.refresh(user)
