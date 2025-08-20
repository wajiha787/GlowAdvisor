# 🏠 Local Development Guide

This guide will help you run the GlowAdvisor AI application locally on your machine.

## 📋 Prerequisites

1. **Python 3.8+** installed
2. **Google Gemini API Key** (you already have this)
3. **Web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### Step 1: Start the Backend Server

**Option A: Using the batch file (Windows)**
```bash
cd api-backend
start_server.bat
```

**Option B: Using Python directly**
```bash
cd api-backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

**Option C: Using the startup script**
```bash
cd api-backend
python start_server.py
```

### Step 2: Open the Frontend

1. Navigate to the `api-frontend` folder
2. Open `index.html` in your web browser
3. Or open `test.html` first to test the connection

## 🔧 Configuration

### Backend Configuration

Make sure you have a `.env` file in the `api-backend` folder:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### Frontend Configuration

The frontend is already configured to use `http://localhost:8000` in `api-frontend/config.js`.

## 🧪 Testing

### Test Page
Open `api-frontend/test.html` in your browser to:
- Test backend connection
- Test API endpoints
- Verify frontend configuration

### Manual Testing
1. **Backend**: Visit `http://localhost:8000`
   - Should show: `{"message": "Hello from FastAPI!", "status": "running", "port": 8000}`

2. **API Docs**: Visit `http://localhost:8000/docs`
   - Interactive API documentation

3. **Frontend**: Open `api-frontend/index.html`
   - Should load the skincare tips generator

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process or use a different port
python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

**Module not found errors:**
```bash
# Install dependencies
pip install -r requirements.txt
```

**API key issues:**
- Make sure `.env` file exists in `api-backend` folder
- Verify your Gemini API key is correct
- Check if the key has proper permissions

### Frontend Issues

**CORS errors:**
- Make sure backend is running on `127.0.0.1:8000`
- Check browser console for errors
- Try opening `test.html` first

**API connection failed:**
- Verify backend is running
- Check `config.js` has correct URL
- Test with `test.html`

## 📁 File Structure

```
textgeneration/
├── api-backend/
│   ├── main.py              # FastAPI server
│   ├── gemini.py            # AI integration
│   ├── requirements.txt     # Python dependencies
│   ├── start_server.py      # Startup script
│   ├── start_server.bat     # Windows batch file
│   └── .env                 # API key (create this)
├── api-frontend/
│   ├── index.html           # Main application
│   ├── styles.css           # Styling
│   ├── script.js            # JavaScript logic
│   ├── config.js            # Configuration
│   └── test.html            # Test page
└── LOCAL_DEVELOPMENT.md     # This file
```

## 🔄 Development Workflow

1. **Start backend** (keep running)
2. **Edit frontend files** (HTML, CSS, JS)
3. **Refresh browser** to see changes
4. **Backend auto-reloads** when you edit Python files

## 🌐 URLs

- **Backend**: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs`
- **Frontend**: `file:///path/to/api-frontend/index.html`
- **Test Page**: `file:///path/to/api-frontend/test.html`

## ✅ Success Indicators

When everything is working:
- ✅ Backend shows "Hello from FastAPI!" at `http://localhost:8000`
- ✅ Test page shows green checkmarks
- ✅ Frontend loads without errors
- ✅ You can generate skincare tips

## 🆘 Getting Help

If you're stuck:
1. Check the test page first
2. Look at browser console for errors
3. Check backend terminal for error messages
4. Verify all files are in the correct locations
