from fastapi import Depends, HTTPException, Request
from supabase import AuthApiError, Client, create_client

from app.core.config import settings


def get_admin_client() -> Client:
    return create_client(settings.supabase_url, settings.supabase_service_role_key)


def get_user_client() -> Client:
    return create_client(settings.supabase_url, settings.supabase_anon_key)


def get_access_token(request: Request) -> str:
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    return auth.split(" ", 1)[1]


def get_current_user(token: str = Depends(get_access_token)) -> dict:
    try:
        return get_user_client().auth.get_user(token).user
    except AuthApiError as err:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
