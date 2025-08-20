from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini import GeminiBlogGenerator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    user_prompt: str

@app.get("/")
def read_root():
    return JSONResponse(content={"message": "Hello from FastAPI!"})

@app.post("/generate")
async def generate(request: PromptRequest):
    generator = GeminiBlogGenerator()
    response_text = generator.generate(request.user_prompt)
    return JSONResponse(content={"response": response_text})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

#http://localhost:8000/