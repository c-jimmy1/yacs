#!/usr/bin/python3
from fastapi import FastAPI, Request, Response, Depends
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session
import os

# Import Pydantic models and controllers
from api_models import UserPydantic, SessionPydantic, CourseCorequisiteCreate
from controllers import user_controller, session_controller
from tables import course_corequisite, SessionLocal


# --- Database Dependency ---
def get_db():
    """Yields a database session and ensures it's closed after use."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Initialize FastAPI App ---
app = FastAPI()

# --- Add Middleware ---
app.add_middleware(SessionMiddleware, secret_key=os.environ.get("SECRET_KEY", "dev_secret_key"))


# --- API Endpoints ---

@app.get('/')
async def root():
    """Confirms the API is running."""
    return {"message": "YACS API is Up!"}


## User Account Management ##
@app.post('/api/user')
async def add_user(user: UserPydantic):
    return user_controller.create_user(user.dict())


@app.delete('/api/user')
async def delete_user(request: Request):
    if 'user' not in request.session:
        return Response("Not authorized", status_code=403)
    user_id = request.session['user']['user_id']
    return user_controller.delete_current_user(user_id)


## Session Management (Login/Logout) ##
@app.post('/api/session')
async def log_in(request: Request, credentials: SessionPydantic):
    return session_controller.log_user_in(credentials.dict(), request.session)


@app.delete('/api/session')
def log_out(request: Request):
    return session_controller.log_user_out(request.session)


## Corequisites ##
@app.post('/api/corequisite')
async def add_corequisite_endpoint(coreq: CourseCorequisiteCreate, db: Session = Depends(get_db)):
    result = course_corequisite.add_corequisite(
        db, coreq.department, coreq.level, coreq.corequisite
    )
    return {"message": "Corequisite added successfully", "id": f"{result.department}-{result.level}"}


@app.get('/api/corequisite/{department}/{level}')
async def get_corequisites_endpoint(department: str, level: int, db: Session = Depends(get_db)):
    results = course_corequisite.get_corequisites(db, department, level)
    return [{"corequisite": r.corequisite} for r in results]


# --- Course endpoints will go here (Issue #4) ---
