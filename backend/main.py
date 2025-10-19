from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.core.config import settings
from app.services.model_service import service
from app.storage.state import save_state

import os

app = FastAPI(
    title="AI Word Predictor (Trigram LM)",
    description="FastAPI service for next-word prediction with automatic persistence.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="")

@app.get("/")
def root():
    return {
        "hello": "AI Word Predictor",
        "docs": "/docs",
        "examples": {"predict_payload": {"context": "the model predicts the", "top_k": 5}},
    }

# save state on shutdown as a safety net
@app.on_event("shutdown")
def _persist_on_shutdown():
    save_state(settings.STATE_PATH, service.model)


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)