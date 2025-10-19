from fastapi import APIRouter, HTTPException
from app.schemas import TrainIn, PredictIn, PredictOut, Prediction
from app.services.model_service import service

router = APIRouter()

@router.get("/health")
def health():
    return {
        "status": "ok",
        "backend": "ngram",
        "vocab_size": len(service.model.V),
        "alpha": service.model.alpha
    }

@router.post("/train")
def train(inp: TrainIn):
    if not inp.text.strip():
        raise HTTPException(status_code=400, detail="Empty text.")
    new_size = service.train(inp.text)
    return {"message": "Model updated", "new_vocab_size": new_size}

@router.post("/predict", response_model=PredictOut)
def predict(inp: PredictIn):
    if inp.top_k <= 0:
        raise HTTPException(status_code=400, detail="top_k must be > 0")
    tail, suggestions = service.predict(inp.context, inp.top_k)
    return PredictOut(
        context_tail=tail,
        suggestions=[Prediction(word=w, probability=round(float(p), 6))
                     for w, p in suggestions if w != "<s>"]
    )
