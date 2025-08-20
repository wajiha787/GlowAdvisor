GlowAdvisor — AI Skincare Assistant (React + Vite + FastAPI + Gemini)

An AI-powered skincare assistant that chats in Markdown and gives safe, evidence-based routines, ingredient breakdowns, and product tips.
Frontend is React + Vite; backend is FastAPI calling Google’s Gemini. Designed to keep secrets on the server.

Table of Contents

Features

Screenshots

Tech Stack

Project Structure

Quick Start (Dev)

Environment Variables

API

Vite Proxy (CORS-free dev)

Security Notes

Troubleshooting

Deployment

Contributing

License

Features

💬 Chat UI with Markdown rendering (lists, headings, tables via GFM).

🧠 Gemini integration on the server for safe, skincare-focused answers.

🧴 AM/PM routines and ingredient guidance; tone is practical and friendly.

⚡ React + Vite hot reload for fast local iteration.

🔐 Secrets stay server-side (no API keys in the browser).

🧩 Optional Tailwind styling (already used in components).

Screenshots

 (glowadvisor1.png)
  (glowadvisor2.png)
   (glowadvisor3.png)

Tech Stack

Frontend: React 18, Vite, react-markdown, remark-gfm, lucide-react, Tailwind (optional)

Backend: FastAPI, Uvicorn, google-generativeai, python-dotenv

Language: TypeScript/JavaScript (front), Python 3.10+ (back)

Project Structure
GlowAdvisor/
├─ public/
│  └─ skincare1.png
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ ErrorBoundary.jsx          # optional but handy
│  └─ index.css                  # Tailwind directives if using Tailwind
├─ server.py                     # FastAPI app (calls Gemini)
├─ .env                          # server-only secrets (ignored by git)
├─ .env.example                  # template (no secrets)
├─ .env.local                    # frontend-only NON-SECRET vars (ignored)
├─ package.json
├─ vite.config.js
├─ requirements.txt              # optional: freeze server deps
└─ README.md

Quick Start (Dev)
1) Backend (FastAPI)
# Windows PowerShell (project root)
py -3.10 -m venv .venv
.\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
python -m pip install "fastapi[standard]" uvicorn google-generativeai python-dotenv

# create .env at repo root
# GEMINI_API_KEY=your_real_key_here
# (Do NOT commit this; .env is in .gitignore)

# run server
python -m uvicorn server:app --reload --host 127.0.0.1 --port 8000


Open http://127.0.0.1:8000/docs
 → test POST /generate.

2) Frontend (React + Vite)
# new terminal (keep server running)
npm install
npm run dev


Open http://localhost:5173
.

If using Tailwind, ensure index.css contains:

@tailwind base;
@tailwind components;
@tailwind utilities;


…and Tailwind is installed/configured per https://tailwindcss.com/docs/guides/vite

Environment Variables
Server (.env) — private
GEMINI_API_KEY=your_real_key_here

Frontend (.env.local) — public / non-secret only
# Optional if you call the API directly; with proxy you don't need this
VITE_API_BASE=http://127.0.0.1:8000


Anything starting with VITE_ is embedded into the client bundle and visible in DevTools. Never put secrets here.

API
POST /generate

Body

{
  "user_prompt": "I have oily skin; morning routine?"
}


Response

{
  "response": "# Oily Skin AM Routine\n\n- Cleanser...\n- SPF..."
}


Curl

curl -X POST http://127.0.0.1:8000/generate \
  -H "Content-Type: application/json" \
  -d "{\"user_prompt\":\"oily skin AM routine\"}"

Vite Proxy (CORS-free dev)

vite.config.js:

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/generate': { target: 'http://127.0.0.1:8000', changeOrigin: true },
    },
  },
})


Then call from React:

await fetch('/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ user_prompt: content }) })

Security Notes

Keep API keys only on the server (FastAPI reads .env).

Frontend must not send secrets or store them in VITE_*.

Commit an .env.example with placeholders to document required vars.

If you accidentally committed .env:

git rm --cached .env
git commit -m "Stop tracking .env"
git push
# rotate exposed keys

Troubleshooting
Blank screen at localhost:5173

Check Console:
If using react-markdown@9, do not pass className directly.

// ✅ wrap in a div
<div className="prose">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
</div>

Failed to fetch / CORS

Use the Vite proxy above, or add CORSMiddleware in FastAPI.

ECONNREFUSED 127.0.0.1:8000

Backend not running or wrong port. Start uvicorn and recheck.

uvicorn: not recognized (Windows)

Activate venv, then run via module:

python -m uvicorn server:app --reload --host 127.0.0.1 --port 8000

PowerShell activation blocked
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
# new PowerShell → activate again: .\.venv\Scripts\Activate.ps1

Port conflicts

Change ports if 5173/8000 are in use:

Vite: npm run dev -- --port 5174

Uvicorn: --port 8001 (update proxy)

Deployment
Frontend (Vercel/Netlify)

Build: npm run build → deploy /dist.

Set VITE_API_BASE to your server URL (public, non-secret).

Backend (Render/Railway/Fly/VM)

Install Python 3.10+.

pip install -r requirements.txt (generate one with pip freeze > requirements.txt).

Set env GEMINI_API_KEY.

Start command: uvicorn server:app --host 0.0.0.0 --port 8000.

Update frontend to call the deployed server (or keep a proxy if you serve both under one domain/path).

Contributing

Fork + create feature branch:

git checkout -b feat/your-feature


Commit with clear messages.

Open a PR with before/after screenshots if UI changes.

License

Choose a license (e.g., MIT). Example:

MIT License — see LICENSE for details.

Credits

Icons by lucide-react

Markdown via react-markdown + remark-gfm

Model: Google Gemini