import os
from pathlib import Path

class Settings:
    ALPHA: float = float(os.getenv("ALPHA", "0.8"))
    DATA_DIR: Path = Path(os.getenv("DATA_DIR", "data"))
    STATE_PATH: Path = DATA_DIR / "model_state.json"
    SEED_TEXT: str = os.getenv("SEED_TEXT", """
    I am building an AI portfolio website.
    I love working with Python and FastAPI.
    Machine learning helps create intelligent applications.
    The model predicts the next word from context.
    This project is minimal, fast, and easy to deploy.
    """)

settings = Settings()
