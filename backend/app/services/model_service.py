from app.core.tokenizer import tokenize
from app.models.ngram import TrigramModel
from app.core.config import settings
from app.storage.state import load_state, save_state

class ModelService:
    def __init__(self):
        # Auto-reload on startup (if a saved state exists)
        model = load_state(settings.STATE_PATH)
        if model is None:
            model = TrigramModel(alpha=settings.ALPHA)
            if settings.SEED_TEXT.strip():
                model.update_from_text(settings.SEED_TEXT)
            # Save initial seed so next boot also has it
            save_state(settings.STATE_PATH, model)
        self.model = model

    def train(self, text: str) -> int:
        self.model.update_from_text(text)
        # Auto-save after every train
        save_state(settings.STATE_PATH, self.model)
        return len(self.model.V)

    def predict(self, context: str, top_k: int = 5):
        tokens = tokenize(context)
        pairs = self.model.topk_next(tokens, k=top_k)
        return tokens[-2:], pairs

    # No manual save/reload methods anymore
service = ModelService()
