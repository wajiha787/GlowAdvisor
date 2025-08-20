# 🚀 Deployment Guide for GlowAdvisor AI

This guide will help you deploy your skincare tips generator to the cloud.

## 📋 Prerequisites

1. **GitHub Account**: For version control
2. **Google Gemini API Key**: Already configured in your project
3. **Railway/Render Account**: For backend deployment (free tier available)

## 🎯 Quick Deployment Options

### Option 1: Railway (Recommended - Easiest)

#### Backend Deployment:
1. **Sign up** at [railway.app](https://railway.app)
2. **Connect your GitHub** repository
3. **Create new project** → "Deploy from GitHub repo"
4. **Select your repository** and the `api-backend` folder
5. **Add environment variable**:
   - Key: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key
6. **Deploy** - Railway will automatically build and deploy

#### Frontend Deployment:
1. **Sign up** at [netlify.com](https://netlify.com)
2. **Connect your GitHub** repository
3. **Create new site** → "Deploy from GitHub repo"
4. **Select your repository** and the `api-frontend` folder
5. **Update config.js** with your Railway backend URL
6. **Deploy**

### Option 2: Render (Alternative)

#### Backend Deployment:
1. **Sign up** at [render.com](https://render.com)
2. **Create new Web Service**
3. **Connect your GitHub** repository
4. **Configure**:
   - Name: `glowadvisor-api`
   - Environment: `Python`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Add environment variable**:
   - Key: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key
6. **Deploy**

#### Frontend Deployment:
1. **Create new Static Site** on Render
2. **Connect your GitHub** repository
3. **Select the `api-frontend` folder**
4. **Update config.js** with your Render backend URL
5. **Deploy**

## 🔧 Manual Deployment Steps

### 1. Prepare Your Repository

```bash
# Make sure all files are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Backend Deployment

#### Using Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

#### Using Render:
- Follow the web interface steps above
- Render will automatically detect your `render.yaml` configuration

### 3. Frontend Deployment

#### Using Netlify:
1. **Drag and drop** the `api-frontend` folder to Netlify
2. **Update config.js** with your backend URL
3. **Redeploy** if needed

#### Using Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd api-frontend
vercel
```

## 🌐 Environment Variables

### Backend (Railway/Render):
- `GEMINI_API_KEY`: Your Google Gemini API key

### Frontend (config.js):
- `window.API_URL`: Your deployed backend URL

## 🔗 Update Frontend Configuration

After deploying your backend, update `api-frontend/config.js`:

```javascript
// Replace with your actual deployed backend URL
window.API_URL = 'https://your-app-name.railway.app';
// or
window.API_URL = 'https://your-app-name.onrender.com';
```

## 🐳 Docker Deployment (Advanced)

If you prefer Docker:

```bash
# Build the image
docker build -t glowadvisor-api ./api-backend

# Run locally
docker run -p 8000:8000 -e GEMINI_API_KEY=your_key glowadvisor-api

# Deploy to Docker Hub
docker tag glowadvisor-api your-username/glowadvisor-api
docker push your-username/glowadvisor-api
```

## 🔍 Testing Your Deployment

1. **Test Backend**: Visit `https://your-backend-url/`
   - Should show: `{"message": "Hello from FastAPI!"}`

2. **Test Frontend**: Visit your frontend URL
   - Should load the skincare tips generator interface

3. **Test Integration**: Try generating skincare tips
   - Should connect to your backend and return results

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Update `main.py` to allow your frontend domain
   - Add your frontend URL to `allow_origins`

2. **API Key Issues**:
   - Verify `GEMINI_API_KEY` is set correctly
   - Check if the key has proper permissions

3. **Build Failures**:
   - Ensure all dependencies are in `requirements.txt`
   - Check Python version compatibility

4. **Port Issues**:
   - Use `$PORT` environment variable (Railway/Render set this automatically)
   - Don't hardcode port 8000 in production

### Debug Commands:

```bash
# Check Railway logs
railway logs

# Check Render logs
# Use the web interface

# Test API locally
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"user_prompt": "test"}'
```

## 📊 Monitoring

### Railway:
- Built-in monitoring dashboard
- Automatic restarts on failure
- Log streaming

### Render:
- Health checks
- Automatic scaling
- Performance monitoring

## 💰 Cost Estimation

### Free Tier:
- **Railway**: $5/month after free tier (500 hours)
- **Render**: Free tier available
- **Netlify**: Free tier available
- **Vercel**: Free tier available

### Total Cost: ~$5-10/month for production use

## 🎉 Success!

Once deployed, your skincare tips generator will be available at:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://your-app-name.railway.app`

Share your app with the world! 🌟 