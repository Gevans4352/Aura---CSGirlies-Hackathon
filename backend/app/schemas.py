from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class RegisterIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=6, max_length=100)


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    email: str
    name: str | None = None


class AuthOut(BaseModel):
    access_token: str
    refresh_token: str
    user: UserOut


class OnboardingIn(BaseModel):
    answers: dict[str, str]


class OnboardingOut(BaseModel):
    id: str
    name: str | None = None
    answers: dict[str, str]
    baseline_msi: float | None = None
    dashboard_priority: str | None = None
    created_at: datetime


class AnalysisOut(BaseModel):
    emotional_allostatic_load: int = Field(ge=0, le=100)
    masking_strain_index: int = Field(ge=0, le=100)
    timestamp: datetime
