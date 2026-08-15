from datetime import datetime, timezone

from app.core.config import settings
from app.schemas import AnalysisOut
from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter(prefix="/api/v1", tags=["analyze"])

DEMO_EAL = 94
DEMO_MSI = 87


@router.post("/analyze", response_model=AnalysisOut)
def analyze(file: UploadFile | None = File(default=None)):
    if not settings.analyze_enabled:
        raise HTTPException(status_code=500, detail="Analysis service unavailable")
    return AnalysisOut(
        emotional_allostatic_load=DEMO_EAL,
        masking_strain_index=DEMO_MSI,
        timestamp=datetime.now(timezone.utc),
    )
