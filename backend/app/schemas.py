from pydantic import BaseModel
from typing import List

class TrainIn(BaseModel):
    text: str

class PredictIn(BaseModel):
    context: str
    top_k: int = 5

class Prediction(BaseModel):
    word: str
    probability: float

class PredictOut(BaseModel):
    context_tail: List[str]
    suggestions: List[Prediction]
