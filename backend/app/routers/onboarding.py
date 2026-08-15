from app.deps import get_admin_client, get_current_user
from app.schemas import OnboardingIn, OnboardingOut
from fastapi import APIRouter, Depends, HTTPException
from supabase import Client

router = APIRouter(prefix="/api/v1/onboarding", tags=["onboarding"])


MIN_MSI = 0
MAX_MSI = 100
BASELINE_MSI = 30
SOCIAL_DRAIN_MSI = {"C": 15, "D": 30}
CALL_TIME_MSI = {"C": 10, "D": 20}


def _derive_msi(answers: dict[str, str]) -> int:
    msi = (
        BASELINE_MSI
        + SOCIAL_DRAIN_MSI.get(answers.get("social_drain"), 0)
        + CALL_TIME_MSI.get(answers.get("call_time"), 0)
    )
    return max(MIN_MSI, min(MAX_MSI, msi))


def _derive_priority(answers: dict[str, str]) -> str:
    return {
        "A": "social_energy",
        "B": "overwhelm_awareness",
        "C": "space_communication",
        "D": "all",
    }.get(answers.get("priority"), "all")


@router.post("", response_model=OnboardingOut)
def create_onboarding(
    payload: OnboardingIn,
    user=Depends(get_current_user),
    admin: Client = Depends(get_admin_client),
):
    row = {
        "id": user.id,
        "name": user.user_metadata.get("name"),
        "answers": payload.answers,
        "baseline_msi": _derive_msi(payload.answers),
        "dashboard_priority": _derive_priority(payload.answers),
        "quiet_mode_default": payload.quiet_mode_default,
    }
    saved = admin.table("profiles").upsert(row, on_conflict="id").execute().data[0]
    return OnboardingOut(**saved)


@router.get("", response_model=OnboardingOut)
def get_onboarding(
    user=Depends(get_current_user),
    admin: Client = Depends(get_admin_client),
):
    rows = admin.table("profiles").select("*").eq("id", user.id).execute().data
    if not rows:
        raise HTTPException(status_code=404, detail="Profile not found")
    return OnboardingOut(**rows[0])
