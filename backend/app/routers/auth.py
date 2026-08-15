from app.deps import get_access_token, get_admin_client, get_current_user
from app.schemas import AuthOut, LoginIn, RegisterIn, UserOut
from fastapi import APIRouter, Depends, HTTPException
from supabase import AuthApiError

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


def _user_out(user) -> UserOut:
    return UserOut(
        id=user.id,
        email=user.email,
        name=user.user_metadata.get("name"),
    )


def _auth_out(res) -> AuthOut:
    return AuthOut(
        access_token=res.session.access_token,
        refresh_token=res.session.refresh_token,
        user=_user_out(res.user),
    )


@router.post("/register", response_model=AuthOut)
def register(body: RegisterIn, client=Depends(get_admin_client)):
    try:
        res = client.auth.sign_up(
            {
                "email": body.email,
                "password": body.password,
                "options": {
                    "data": {
                        "name": body.name,
                    },
                },
            }
        )
    except AuthApiError as err:
        raise HTTPException(status_code=err.status or 400, detail=err.message)
    return _auth_out(res)


@router.post("/login", response_model=AuthOut)
def login(body: LoginIn, client=Depends(get_admin_client)):
    try:
        res = client.auth.sign_in_with_password(
            {"email": body.email, "password": body.password}
        )
    except AuthApiError as err:
        raise HTTPException(status_code=err.status or 401, detail=err.message)
    return _auth_out(res)


@router.get("/me", response_model=UserOut)
def me(user=Depends(get_current_user)):
    return _user_out(user)


@router.post("/logout", status_code=204)
def logout(token: str = Depends(get_access_token), client=Depends(get_admin_client)):
    try:
        client.auth.admin.sign_out(token)
    except AuthApiError:
        pass
