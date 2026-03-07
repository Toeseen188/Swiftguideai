# 🚀 SwiftGuide Localhost Development Setup

## ✅ Localhost Ready!

Your SwiftGuide project is now configured for **local development** on `http://localhost:3000`.

---

## **Quick Start**

### **1. Install Dependencies** (if not done yet)
```bash
cd /home/pc/Swiftrouteai
npm install
```

### **2. Start Development Servers**
```bash
npm run dev
```

This will start:
- **Frontend (Vite)**: `http://localhost:3000` ✨
- **Backend API**: `http://localhost:3001` 🔧

### **3. Open in Browser**
Navigate to: **`http://localhost:3000`**

---

## **What Happens When You Run `npm run dev`**

The command `concurrently "npm run server" "npm run start"` runs both:

1. **API Server** (`npm run server`)
   - Express.js server on port 3001
   - Handles route generation requests
   - Connects to Claude AI and Supabase

2. **Frontend** (`npm run start`)
   - Vite development server on port 3000
   - Hot reload enabled
   - Serves React app with Leaflet maps

---

## **Environment Configuration**

Your `.env` file is already configured for localhost:

```env
PORT=3001
ANTHROPIC_API_KEY=sk-ant-api03-...  # Your Claude API key
REACT_APP_API_URL=http://localhost:3001  # Points to local API
REACT_APP_SUPABASE_URL=https://qwiizxggrcbfdqekhrgp.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...  # Your Supabase key
```

**⚠️ Security Note:** Never commit `.env` to GitHub. It's in `.gitignore` for safety.

---

## **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend + backend (recommended) |
| `npm run start` | Start only frontend (Vite) |
| `npm run server` | Start only backend API |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## **Testing the App**

1. **Start servers**: `npm run dev`
2. **Open browser**: `http://localhost:3000`
3. **Test features**:
   - Enter a location or use GPS
   - Select disaster type (flood/fire/earthquake)
   - Click "Find My Safe Route"
   - View routes on Leaflet map
   - See route cards with safety scores

---

## **API Endpoints** (for testing)

- **Health Check**: `http://localhost:3001/api/health`
- **Generate Routes**: `POST http://localhost:3001/api/generate-route`

---

## **Troubleshooting**

### **Port Already in Use**
```bash
# Kill processes on ports 3000 and 3001
lsof -ti:3000,3001 | xargs kill -9
```

### **Dependencies Not Installing**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Environment Variables Not Working**
- Ensure `.env` file exists in project root
- Restart both servers: `Ctrl+C` then `npm run dev`
- Check variable names match exactly

### **Map Not Loading**
- Check browser console for Leaflet errors
- Ensure internet connection (Leaflet loads tiles from OpenStreetMap)

### **API Calls Failing**
- Verify API server is running on port 3001
- Check browser network tab for 404/500 errors
- Test health endpoint: `curl http://localhost:3001/api/health`

---

## **Development Workflow**

1. **Make changes** to React components in `src/`
2. **Hot reload** automatically updates the browser
3. **API changes** in `api/` require server restart
4. **Test locally** before pushing to GitHub

---

## **Switching Between Local & Production**

- **Local**: `REACT_APP_API_URL=http://localhost:3001`
- **Production**: `REACT_APP_API_URL=https://your-vercel-app.vercel.app`

The app automatically adapts based on your `.env` file!

---

## **Ready to Develop! 🎉**

```bash
npm run dev
# Then visit: http://localhost:3000
```

**Questions?** Check the terminal output for server status messages.