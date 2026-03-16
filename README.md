# AI Word Predictor

AI Word Predictor is a small full-stack app for training a trigram language model and predicting the next word from a text prompt. The backend is built with FastAPI, and the frontend is built with Next.js.

## Features

- Train the model with custom text from the UI or API
- Predict the next word with top-k suggestions and probabilities
- Persist model state to disk automatically
- Run the backend and frontend separately for local development
- Use the FastAPI docs at `/docs` for quick API testing

## Stack

- Backend: FastAPI, Pydantic, Uvicorn
- Frontend: Next.js 15, React 19, TypeScript
- Model: Trigram N-gram language model with Laplace smoothing

## Project Structure

```text
backend/
  app/
    api/
    core/
    services/
    storage/
  data/
  main.py
  requirements.txt

frontend/
  app/
  components/
  hooks/
  lib/
  package.json
```

## Local Setup

### 1. Start the backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend endpoints:

- `GET /`
- `GET /health`
- `POST /train`
- `POST /predict`
- Swagger UI: `http://localhost:8000/docs`

### 2. Start the frontend

Create `frontend/.env.local`:

```env
API_BASE_URL=http://localhost:8000
```

Then run:

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:

- `http://localhost:3000`

## API Examples

Train the model:

```bash
curl -X POST "http://localhost:8000/train" ^
  -H "Content-Type: application/json" ^
  -d "{\"text\":\"AI models predict the next token from context.\"}"
```

Predict the next word:

```bash
curl -X POST "http://localhost:8000/predict" ^
  -H "Content-Type: application/json" ^
  -d "{\"context\":\"predict the next\",\"top_k\":5}"
```

Example response:

```json
{
  "context_tail": ["the", "next"],
  "suggestions": [
    {
      "word": "word",
      "probability": 0.123456
    }
  ]
}
```

## Notes

- Model state is stored in `backend/data/model_state.json`
- The backend allows all CORS origins by default and should be tightened for production
- The frontend server routes proxy requests to the backend using `API_BASE_URL`

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
