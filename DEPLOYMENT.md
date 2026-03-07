# 🚀 SwiftGuide Vercel Deployment Guide

## ✅ Deployment Setup Complete

Your project is now configured for **full-stack Vercel deployment**. Here's how to deploy:

---

## **Step 1: Set Up Environment Variables on Vercel**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `Swiftrouteai` project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Variable | Value | From |
|----------|-------|------|
| `ANTHROPIC_API_KEY` | Your actual API key | `.env` file |
| `REACT_APP_SUPABASE_URL` | Your Supabase URL | `.env` file |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase key | `.env` file |
| `REACT_APP_API_URL` | `https://your-deployment.vercel.app` | After first deploy |

**⚠️ IMPORTANT:** 
- Never commit real API keys to GitHub
- Use Vercel's Environment Variables panel instead
- Your `.env` file is ignored by Git (.gitignore protects it)

---

## **Step 2: Deploy to Vercel**

### **Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
cd /home/pc/Swiftrouteai
vercel

# For production deployment
vercel --prod
```

### **Option B: Using GitHub (Automatic)**

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. On Vercel Dashboard, click **"Add New..." → "Project"**
3. Select your GitHub repository
4. Add environment variables (same as Step 1)
5. Click **"Deploy"**

---

## **Step 3: After First Deployment**

1. Your app will be live at `https://your-project-name.vercel.app`

2. **Update `REACT_APP_API_URL` environment variable:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Change `REACT_APP_API_URL` to: `https://your-project-name.vercel.app`
   - Redeploy: `vercel --prod`

3. Share the URL with your team members! ✨

---

## **Project Structure for Vercel**

```
/home/pc/Swiftrouteai/
├── api/
│   ├── index.js          ← Express app export for serverless
│   ├── generateRoute.js  ← Route generation logic
│   ├── supabaseService.js
│   ├── mockData.js
│   └── server.js         ← Local development only
├── src/                  ← React frontend
├── vercel.json          ← Vercel configuration
├── vite.config.js       ← Vite config with env loading
├── package.json         ← Updated scripts
├── .env                 ← Local secrets (not committed)
├── .env.example         ← Template for team
└── .gitignore          ← Protects .env
```

---

## **Key Files Changed for Deployment**

✅ **vercel.json** - Configures Vercel build & rewrites
✅ **api/index.js** - Exports Express app for serverless functions
✅ **vite.config.js** - Loads environment variables for frontend
✅ **.env.example** - Template with placeholders (safe to commit)
✅ **package.json** - Removed dev-only dependencies (nodemon)

---

## **Troubleshooting**

### **"Module not found" errors**

```bash
npm install
```

### **Environment variables not working**

- Confirm they're set in Vercel Dashboard
- For `REACT_APP_*` variables, redeploy after adding them
- Check they match exactly: `REACT_APP_API_URL` (not `ViteAPPApiUrl`)

### **API calls returning 404**

- Verify `REACT_APP_API_URL` is set correctly
- On Vercel: `https://your-app.vercel.app` (not `http://localhost:3001`)
- Restart deployment after changing env vars

### **Supabase not connecting**

- Check `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` are exact
- Verify they work locally first

---

## **For Your Team Members**

Share this with them:

1. **To get started locally:**
   ```bash
   git clone https://github.com/Toeseen188/Swiftrouteai.git
   cd Swiftrouteai
   npm install
   cp .env.example .env
   # Add actual API keys to .env (ask you for them)
   npm run dev
   ```

2. **Live deployment:** `https://your-app.vercel.app`

3. **They should NOT:**
   - Commit `.env` files
   - Push API keys to GitHub
   - Modify vercel.json without testing

---

## **Local Development** (unchanged)

```bash
npm run dev       # Starts Vite dev server on port 3000
# API runs separately if needed
```

---

## **Next Steps**

1. ✅ Install dependencies: `npm install`
2. ✅ Commit all changes: `git add . && git commit -m "Setup Vercel deployment"`
3. ✅ Push to GitHub: `git push origin main`
4. ✅ Deploy: `vercel --prod`
5. ✅ Add environment variables in Vercel Dashboard
6. ✅ Redeploy after adding env vars
7. ✅ Share live URL with team!

---

**Questions?** Check:
- [Vercel Docs](https://vercel.com/docs)
- [Express on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions/supported-languages#node.js)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
