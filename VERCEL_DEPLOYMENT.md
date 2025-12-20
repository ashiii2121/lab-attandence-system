# 🚀 Vercel Deployment Guide - Lab Attendance System

**Platform:** Vercel (Frontend) + Render (Backend)  
**Date:** December 20, 2025  
**Estimated Time:** 15-20 minutes

---

## 📋 Overview

This guide will help you deploy:
- **Frontend** → Vercel (Free)
- **Backend** → Render (Free)
- **Database** → MongoDB Atlas (Free)

**Total Cost:** $0/month 🎉

---

## ✅ Prerequisites

Before starting, ensure you have:
- [ ] GitHub account
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Render account (sign up at https://render.com)
- [ ] MongoDB Atlas account (sign up at https://mongodb.com/cloud/atlas)
- [ ] Code pushed to GitHub

---

## 🗄️ Step 1: Set Up MongoDB Atlas (5 minutes)

### 1.1 Create Cluster

1. Go to https://mongodb.com/cloud/atlas
2. Sign in / Sign up
3. Click **"Build a Database"**
4. Choose **"M0 FREE"** tier
5. Select region closest to you
6. Click **"Create Cluster"**

### 1.2 Create Database User

1. Go to **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `lab-attendance-admin`
5. Password: Click **"Autogenerate Secure Password"** (save this!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 1.3 Whitelist IP Addresses

1. Go to **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Go to **"Database"** → **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string
4. It looks like: `mongodb+srv://lab-attendance-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<password>` with your actual password
6. Add database name: `mongodb+srv://...mongodb.net/lab-attendance?retryWrites=true&w=majority`

**Save this connection string!** You'll need it for the backend.

---

## 🖥️ Step 2: Deploy Backend to Render (5 minutes)

### 2.1 Prepare Backend

The backend is already prepared with:
- ✅ `server/package.json` created
- ✅ Environment variables configured
- ✅ All dependencies listed

### 2.2 Deploy to Render

1. Go to https://render.com
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository: `lab-attandence-system`
5. Configure:

**Basic Settings:**
- **Name:** `lab-attendance-backend`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `server`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** ($0/month)

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```
NODE_ENV = production
PORT = 5000
MONGODB_URI = mongodb+srv://lab-attendance-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lab-attendance?retryWrites=true&w=majority
JWT_SECRET = (generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_EXPIRE = 7d
CLIENT_URL = https://your-app.vercel.app
```

**Important:** 
- Replace `MONGODB_URI` with your actual Atlas connection string
- Generate a secure `JWT_SECRET` (32+ characters)
- We'll update `CLIENT_URL` after deploying frontend

### 2.4 Create Web Service

1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. Once deployed, you'll see: ✅ **"Live"**
4. Your backend URL: `https://lab-attendance-backend.onrender.com`

### 2.5 Test Backend

```bash
# Test health endpoint
curl https://lab-attendance-backend.onrender.com/health

# Should return: {"status":"OK","message":"Server is running"}
```

**Save your backend URL!** You'll need it for the frontend.

---

## 🎨 Step 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Update Frontend Configuration

The frontend is already configured with:
- ✅ `client/vercel.json` created
- ✅ `client/.env.production` created
- ✅ `client/src/config.js` created
- ✅ API calls updated to use config

### 3.2 Update Environment Variable

Edit `client/.env.production`:

```env
VITE_API_URL=https://lab-attendance-backend.onrender.com
```

Replace with your actual Render backend URL.

### 3.3 Commit Changes

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 3.4 Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your repository: `lab-attandence-system`
5. Configure:

**Project Settings:**
- **Framework Preset:** Vite
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables:**
- Click **"Environment Variables"**
- Add: `VITE_API_URL` = `https://lab-attendance-backend.onrender.com`

6. Click **"Deploy"**
7. Wait for deployment (1-2 minutes)
8. Once deployed: ✅ **"Visit"** your site

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from client directory
cd client
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? lab-attendance-system
# - Directory? ./
# - Override settings? No

# For production
vercel --prod
```

### 3.5 Get Your Frontend URL

After deployment, you'll get a URL like:
- `https://lab-attendance-system.vercel.app`
- Or `https://lab-attendance-system-username.vercel.app`

**Save this URL!**

---

## 🔄 Step 4: Update Backend CLIENT_URL (2 minutes)

Now that you have your frontend URL, update the backend:

1. Go to Render Dashboard
2. Select your **"lab-attendance-backend"** service
3. Go to **"Environment"**
4. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL = https://lab-attendance-system.vercel.app
   ```
5. Click **"Save Changes"**
6. Service will automatically redeploy

---

## ✅ Step 5: Test Your Deployment

### 5.1 Test Backend

```bash
# Health check
curl https://lab-attendance-backend.onrender.com/health

# Create attendance
curl -X POST https://lab-attendance-backend.onrender.com/api/create \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","notes":"Testing deployment"}'

# Should return: {"token":1}
```

### 5.2 Test Frontend

1. Visit your Vercel URL: `https://lab-attendance-system.vercel.app`
2. Check:
   - [ ] Homepage loads
   - [ ] Real-time clock working
   - [ ] Icons displaying
   - [ ] Background slideshow working

### 5.3 Test Full Flow

1. **Check-In:**
   - Click "Start Session"
   - Enter name and notes
   - Click "Submit"
   - Verify token displayed

2. **Admin Dashboard:**
   - Visit `/admin`
   - Verify statistics cards
   - Test search functionality
   - Try CSV export

3. **Check-Out:**
   - Click "Exit Session"
   - Enter token
   - Verify success message

---

## 🎯 Step 6: Custom Domain (Optional)

### 6.1 Add Domain to Vercel

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `attendance.yourdomain.com`)
4. Follow DNS configuration instructions

### 6.2 Update Backend CLIENT_URL

Update Render environment variable:
```
CLIENT_URL = https://attendance.yourdomain.com
```

---

## 📊 Deployment Summary

After successful deployment, you'll have:

### **Frontend (Vercel):**
- ✅ URL: `https://lab-attendance-system.vercel.app`
- ✅ Auto-deploys on git push
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Automatic scaling

### **Backend (Render):**
- ✅ URL: `https://lab-attendance-backend.onrender.com`
- ✅ Auto-deploys on git push
- ✅ Free SSL certificate
- ✅ Automatic restarts
- ✅ Environment variables secured

### **Database (MongoDB Atlas):**
- ✅ Free M0 cluster
- ✅ Automatic backups
- ✅ 512MB storage
- ✅ Monitoring included

---

## 🔧 Troubleshooting

### Issue 1: Frontend Can't Connect to Backend

**Symptoms:** API errors, "Failed to fetch"

**Solutions:**
1. Check `VITE_API_URL` in Vercel environment variables
2. Verify backend is running on Render
3. Check CORS configuration in backend
4. Ensure `CLIENT_URL` matches frontend URL

### Issue 2: Backend Won't Start

**Symptoms:** Render shows "Deploy failed"

**Solutions:**
1. Check Render logs for errors
2. Verify `MONGODB_URI` is correct
3. Ensure all environment variables are set
4. Check `package.json` has correct start script

### Issue 3: Database Connection Failed

**Symptoms:** "MongoDB connection error"

**Solutions:**
1. Verify MongoDB Atlas connection string
2. Check IP whitelist (should include 0.0.0.0/0)
3. Verify database user credentials
4. Ensure cluster is running

### Issue 4: Build Fails on Vercel

**Symptoms:** "Build failed" on Vercel

**Solutions:**
1. Check build logs for specific error
2. Verify `package.json` dependencies
3. Test build locally: `npm run build`
4. Ensure Node.js version compatibility

---

## 🔄 Continuous Deployment

Both Vercel and Render are now set up for automatic deployment:

### When you push to GitHub:
1. **Frontend** automatically redeploys on Vercel
2. **Backend** automatically redeploys on Render
3. Changes go live in 1-2 minutes

### To deploy changes:
```bash
git add .
git commit -m "Your changes"
git push origin main

# Wait 1-2 minutes
# Check Vercel and Render dashboards
```

---

## 📱 Monitoring Your Deployment

### Vercel Dashboard:
- View deployment logs
- Monitor performance
- Check analytics
- View error logs

### Render Dashboard:
- View service logs
- Monitor CPU/Memory
- Check uptime
- View metrics

### MongoDB Atlas:
- Monitor database performance
- View query statistics
- Check storage usage
- Set up alerts

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Frontend loads at Vercel URL
- [ ] Backend health check responds
- [ ] Database connection successful
- [ ] Check-in flow works
- [ ] Check-out flow works
- [ ] Admin dashboard loads
- [ ] Statistics display correctly
- [ ] Search functionality works
- [ ] CSV export works
- [ ] Auto-refresh works
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] No console errors

---

## 📝 Your Deployment URLs

Fill in after deployment:

```
Frontend URL: https://lab-attendance-system.vercel.app
Backend URL: https://lab-attendance-backend.onrender.com
Admin Dashboard: https://lab-attendance-system.vercel.app/admin
Health Check: https://lab-attendance-backend.onrender.com/health
MongoDB Atlas: https://cloud.mongodb.com

GitHub Repo: https://github.com/ashiii2121/lab-attandence-system
```

---

## 🚀 Next Steps

After successful deployment:

1. **Share the URL** with users
2. **Monitor usage** via dashboards
3. **Set up alerts** for downtime
4. **Implement JWT auth** (see SECURITY_FIXES.md)
5. **Add custom domain** (optional)
6. **Set up analytics** (optional)

---

## 💡 Tips

- **Free Tier Limits:**
  - Vercel: Unlimited bandwidth
  - Render: Spins down after 15 min inactivity (first request may be slow)
  - MongoDB Atlas: 512MB storage

- **To keep Render active:**
  - Use a service like UptimeRobot to ping every 10 minutes
  - Or upgrade to paid tier ($7/month)

- **Performance:**
  - First load may be slow (cold start)
  - Subsequent loads are fast
  - Consider paid tier for production

---

**Deployment Guide Version:** 1.0  
**Last Updated:** December 20, 2025  
**Platform:** Vercel + Render + MongoDB Atlas  
**Estimated Cost:** $0/month (Free tier)

---

## 🎊 Congratulations!

Your Lab Attendance System is now live and accessible worldwide! 🌍

**Share your deployment:**
- Frontend: `https://your-app.vercel.app`
- Admin: `https://your-app.vercel.app/admin`

🎉 **You're now deployed to production!** 🎉
