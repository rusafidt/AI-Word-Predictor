import json
from pathlib import Path
from typing import Optional
from app.models.ngram import TrigramModel

def save_state(path: Path, model: TrigramModel) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(model.to_dict(), f)

def load_state(path: Path) -> Optional[TrigramModel]:
    if not path.exists():
        return None
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)
    return TrigramModel.from_dict(data)
