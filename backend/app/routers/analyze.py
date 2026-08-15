from datetime import datetime, timezone

from app.core.config import settings
from app.deps import get_admin_client, get_current_user
from app.schemas import AnalysisOut
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from supabase import Client

router = APIRouter(prefix="/api/v1", tags=["analyze"])

DEMO_EAL = 18
DEMO_MSI = 87


@router.post("/analyze", response_model=AnalysisOut)
def analyze(
    file: UploadFile | None = File(default=None),
    user=Depends(get_current_user),
    admin: Client = Depends(get_admin_client),
):
    if not settings.analyze_enabled:
        raise HTTPException(status_code=500, detail="Analysis service unavailable")
    result = AnalysisOut(
        emotional_allostatic_load=DEMO_EAL,
        masking_strain_index=DEMO_MSI,
        timestamp=datetime.now(timezone.utc),
    )
    admin.table("analyses").insert(
        {
            "user_id": user.id,
            "emotional_allostatic_load": result.emotional_allostatic_load,
            "masking_strain_index": result.masking_strain_index,
        }
    ).execute()
    return result


@router.get("/analysis/latest", response_model=AnalysisOut)
def latest_analysis(
    user=Depends(get_current_user),
    admin: Client = Depends(get_admin_client),
):
    rows = (
        admin.table("analyses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", desc=True)
        .limit(1)
        .execute()
        .data
    )
    if not rows:
        raise HTTPException(status_code=404, detail="No analysis found")
    row = rows[0]
    return AnalysisOut(
        emotional_allostatic_load=row["emotional_allostatic_load"],
        masking_strain_index=row["masking_strain_index"],
        timestamp=row["created_at"],
    )
