from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str
    analyze_enabled: bool = True
    cors_origins: list[str] = [
        "https://aura-csgirlies-hackathon.onrender.com",
        "http://localhost:5173",
    ]

    model_config = {"env_file": ".env"}


settings = Settings()
