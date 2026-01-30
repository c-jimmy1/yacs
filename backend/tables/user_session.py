from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from .database import Base


class UserSession(Base):
    __tablename__ = 'user_session'

    session_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=True)


# --- Session operations ---

def create_session(db: Session, user_id: int) -> UserSession:
    """Creates and saves a new user session."""
    new_session = UserSession(user_id=user_id, start_time=datetime.utcnow())
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session


def get_session(db: Session, session_id: str) -> UserSession | None:
    """Gets a session by its ID."""
    return db.query(UserSession).filter(UserSession.session_id == session_id).first()


def end_session(db: Session, session_id: str) -> UserSession | None:
    """Finds a session and sets its end time."""
    session_to_end = get_session(db, session_id)
    if session_to_end:
        session_to_end.end_time = datetime.utcnow()
        db.commit()
        db.refresh(session_to_end)
    return session_to_end
