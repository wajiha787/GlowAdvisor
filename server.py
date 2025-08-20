# server.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# ---- Gemini integration ----
import google.generativeai as genai

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set in .env")

genai.configure(api_key=API_KEY)

MODEL_NAME = "gemini-1.5-flash"  # or 'gemini-1.5-pro'
model = genai.GenerativeModel(
    model_name=MODEL_NAME,
    system_instruction=(
        "You are GlowAdvisor AI, an expert skincare advisor. "
        "Always answer in clear Markdown with headings, lists, and AM/PM routines. "
        "Be safe, evidence-based, and practical."
    ),
)

app = FastAPI()
# You already use a Vite proxy, so CORS is optional; keep it lenient for dev:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

class In(BaseModel):
    user_prompt: str

class Out(BaseModel):
    response: str

@app.post("/generate", response_model=Out)
def generate(body: In):
    try:
        resp = model.generate_content(
            body.user_prompt,
            generation_config={"temperature": 0.6, "max_output_tokens": 4096},
        )
        text = getattr(resp, "text", None) or "## Sorry\nNo content returned."
        return {"response": text}
    except Exception as e:
        # Surface the error in server logs and a 500 to the client
        print("Gemini error:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"ok": True}
