# 🔮 AI Word Predictor

An intelligent text prediction service that suggests the next word based on context — like a mini autocomplete brain.  
Built with **FastAPI**, this project uses an **N-gram Language Model (Trigram)** that learns from your training text and automatically saves its progress.

---

## 🎯 How It Works

### **Behind the Scenes of Word Prediction:**

1. **You send a sentence** → “The model predicts the”  
2. **AI reads the context** → Looks at previous two words  
3. **Trigram model calculates probabilities** → Learns patterns like “the model predicts *output*”  
4. **Smart suggestions** → Returns top possible next words with confidence scores  

### **Example Response:**
```json
{
  "context_tail": ["the"],
  "suggestions": [
    {"word": "output", "probability": 0.192},
    {"word": "future", "probability": 0.154},
    {"word": "next", "probability": 0.113}
  ]
}
```

---

## 🏗️ Architecture

### Backend (FastAPI)

-> Python 3.11+ with FastAPI framework  
-> Trigram (N-gram) Language Model for learning and predicting  
-> Automatic saving & reloading of model state  
-> CORS enabled for frontend or API testing tools  
-> Interactive API docs via Swagger UI  

---

## Local Setup

```bash
git clone https://github.com/your-username/ai-word-predictor.git
cd ai-word-predictor
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Example usage

#### Train the Model
```bash
curl -X POST "http://localhost:8000/train" \
     -H "Content-Type: application/json" \
     -d '{"text": "AI models predict the next token from context."}'
```

### Predict Next Word
```bash
curl -X POST "http://localhost:8000/predict" \
     -H "Content-Type: application/json" \
     -d '{"context": "predict the next", "top_k": 5}'
```

---

## 🧠 Model Behavior

• Uses a Trigram (3-word context) to estimate next-word probabilities  
• Applies Laplace smoothing to handle unseen words  
• Automatically saves after training and reloads on startup  
• Learns cumulatively — the more text you train, the smarter it gets!  

---

## 📁 Project Structure

```bash
ai-word-predictor/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── api/routes.py        # API endpoints
│   ├── core/
│   │   ├── config.py        # Settings & paths
│   │   └── tokenizer.py     # Text preprocessing
│   ├── models/ngram.py      # Trigram model logic
│   ├── services/model_service.py  # Auto-save & predict logic
│   ├── storage/state.py     # Save/load model state to JSON
│   └── schemas.py           # Request & response schemas
├── requirements.txt          # Dependencies
├── Dockerfile                # Deployment setup
└── README.md                 # This file
```

---

## 🎨 Features

### Core Features

• ✅ Learns language patterns via N-gram modeling  
• ✅ Automatically saves progress after each training  
• ✅ Predicts top-k next words with probabilities  
• ✅ Fast and lightweight (no external ML dependencies)  
• ✅ Easy to deploy on Render, Railway, or any VPS  
• ✅ Swagger UI for easy testing  