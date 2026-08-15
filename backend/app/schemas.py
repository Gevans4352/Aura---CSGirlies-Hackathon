from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, field_validator

ONBOARDING_ANSWERS: dict[str, set[str]] = {
    "social_drain": {"A", "B", "C", "D"},
    "call_time": {"A", "B", "C", "D"},
    "communication_style": {"A", "B", "C", "D"},
    "priority": {"A", "B", "C", "D"},
    "privacy_consent": {"A", "B"},
}


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

    @field_validator("answers")
    @classmethod
    def _validate_answers(cls, answers: dict[str, str]) -> dict[str, str]:
        unexpected = set(answers) - set(ONBOARDING_ANSWERS)
        if unexpected:
            raise ValueError(f"Unexpected answers: {sorted(unexpected)}")
        missing = set(ONBOARDING_ANSWERS) - set(answers)
        if missing:
            raise ValueError(f"Missing answers: {sorted(missing)}")
        for key, value in answers.items():
            if value not in ONBOARDING_ANSWERS[key]:
                raise ValueError(f"Invalid answer '{value}' for '{key}'")
        return answers


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
