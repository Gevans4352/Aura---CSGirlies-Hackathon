from fastapi import Depends, HTTPException, Request
from supabase import AuthApiError, Client, create_client
from supabase_auth.types import User

from app.core.config import settings

_admin_client = create_client(settings.supabase_url, settings.supabase_service_role_key)
_user_client = create_client(settings.supabase_url, settings.supabase_anon_key)


def get_admin_client() -> Client:
    return _admin_client


def get_user_client() -> Client:
    return _user_client


def get_access_token(request: Request) -> str:
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    return auth.split(" ", 1)[1]


def get_current_user(token: str = Depends(get_access_token)) -> User:
    try:
        return get_user_client().auth.get_user(token).user
    except AuthApiError as err:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
