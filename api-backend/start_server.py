#!/usr/bin/env python3
"""
Simple startup script for GlowAdvisor AI Backend
"""

import uvicorn
import os
import sys

def main():
    print("=" * 50)
    print("🚀 GlowAdvisor AI Backend Server")
    print("=" * 50)
    
    # Check if .env file exists
    if not os.path.exists('.env'):
        print("⚠️  Warning: .env file not found!")
        print("   Make sure you have set up your GEMINI_API_KEY")
        print("   Create a .env file with: GEMINI_API_KEY=your_api_key_here")
    
    print("📍 Server will be available at: http://localhost:8000")
    print("📖 API Documentation: http://localhost:8000/docs")
    print("🔄 Auto-reload enabled")
    print("=" * 50)
    
    try:
        uvicorn.run(
            "main:app", 
            host="127.0.0.1", 
            port=8000, 
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 