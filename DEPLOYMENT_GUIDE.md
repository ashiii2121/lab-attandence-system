# 🚀 Deployment Guide - Lab Attendance System

**Version:** 1.0  
**Last Updated:** December 20, 2025

---

## 📋 Table of Contents

1. [Deployment Options](#deployment-options)
2. [Production Checklist](#production-checklist)
3. [Environment Setup](#environment-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Database Setup](#database-setup)
7. [Domain & SSL](#domain--ssl)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Deployment Options

### Option 1: Render (Recommended - Free Tier Available)
- **Backend:** Render Web Service
- **Frontend:** Render Static Site
- **Database:** MongoDB Atlas (Free Tier)
- **Cost:** Free for small projects

### Option 2: Vercel + Railway
- **Backend:** Railway
- **Frontend:** Vercel
- **Database:** MongoDB Atlas
- **Cost:** Free tier available

### Option 3: Heroku
- **Backend:** Heroku Dyno
- **Frontend:** Heroku or Netlify
- **Database:** MongoDB Atlas
- **Cost:** $7/month minimum

### Option 4: VPS (DigitalOcean, AWS, etc.)
- **Full Control:** Self-hosted
- **Database:** Self-hosted or Atlas
- **Cost:** $5-10/month

---

## ✅ Production Checklist

Before deploying, ensure:

### Security
- [ ] Change `JWT_SECRET` to strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Remove all console.logs from production code
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Set up rate limiting appropriately
- [ ] Review and update security headers

### Environment Variables
- [ ] All secrets in environment variables
- [ ] No hardcoded credentials
- [ ] `.env` file in `.gitignore`
- [ ] `.env.example` updated

### Database
- [ ] MongoDB connection string updated
- [ ] Database indexes created
- [ ] Backup strategy in place
- [ ] Connection pooling configured

### Code
- [ ] All tests passing
- [ ] No TypeScript/ESLint errors
- [ ] Production build tested locally
- [ ] Dependencies updated
- [ ] Unused dependencies removed

### Performance
- [ ] Frontend optimized and minified
- [ ] Images compressed
- [ ] Lazy loading implemented
- [ ] Caching configured

---

## 🔐 Environment Setup

### Production Environment Variables

Create `.env` file with production values:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lab-attendance?retryWrites=true&w=majority

# Security
JWT_SECRET=your-super-secure-random-string-min-32-chars
JWT_EXPIRE=7d

# Client Configuration
CLIENT_URL=https://your-frontend-domain.com

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Generate Secure JWT Secret

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Online
# Visit: https://www.grc.com/passwords.htm
```

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create new cluster (Free tier: M0)

### Step 2: Configure Database

1. **Create Database User:**
   - Database Access → Add New User
   - Username: `lab-attendance-admin`
   - Password: Generate secure password
   - Role: Read and write to any database

2. **Whitelist IP Addresses:**
   - Network Access → Add IP Address
   - For development: Add your IP
   - For production: Add `0.0.0.0/0` (allow from anywhere)
   - Or add specific server IPs

3. **Get Connection String:**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `lab-attendance`

### Step 3: Test Connection

```bash
# Update .env with Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lab-attendance

# Test locally
cd server
npm start

# Should see: ✅ MongoDB Connected: cluster.mongodb.net
```

---

## 🖥️ Backend Deployment

### Option 1: Deploy to Render

#### Step 1: Prepare Backend

1. **Create `render.yaml` in root:**

```yaml
services:
  - type: web
    name: lab-attendance-backend
    env: node
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: JWT_EXPIRE
        value: 7d
      - key: CLIENT_URL
        sync: false
```

#### Step 2: Deploy

1. Go to https://render.com
2. Sign up / Log in
3. New → Web Service
4. Connect GitHub repository
5. Configure:
   - **Name:** lab-attendance-backend
   - **Environment:** Node
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Instance Type:** Free

6. Add Environment Variables:
   - `NODE_ENV`: production
   - `MONGODB_URI`: (your Atlas connection string)
   - `JWT_SECRET`: (generate secure string)
   - `CLIENT_URL`: (your frontend URL)

7. Click "Create Web Service"

#### Step 3: Verify

- Check logs for "✅ MongoDB Connected"
- Test health endpoint: `https://your-app.onrender.com/health`

---

### Option 2: Deploy to Railway

#### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
railway login
```

#### Step 2: Deploy

```bash
cd server
railway init
railway up

# Add environment variables
railway variables set NODE_ENV=production
railway variables set MONGODB_URI=your-connection-string
railway variables set JWT_SECRET=your-secret
railway variables set CLIENT_URL=your-frontend-url
```

#### Step 3: Get URL

```bash
railway domain
# Note the URL for frontend configuration
```

---

### Option 3: Deploy to Heroku

#### Step 1: Install Heroku CLI

```bash
# Download from: https://devcenter.heroku.com/articles/heroku-cli
heroku login
```

#### Step 2: Create Heroku App

```bash
cd server
heroku create lab-attendance-backend

# Add environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-connection-string
heroku config:set JWT_SECRET=your-secret
heroku config:set CLIENT_URL=your-frontend-url
```

#### Step 3: Create Procfile

```bash
# In server directory
echo "web: node index.js" > Procfile
```

#### Step 4: Deploy

```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main

# View logs
heroku logs --tail
```

---

## 🎨 Frontend Deployment

### Option 1: Deploy to Render (Static Site)

#### Step 1: Update Vite Config

```javascript
// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

#### Step 2: Create Environment File

```bash
# client/.env.production
VITE_API_URL=https://your-backend.onrender.com
```

#### Step 3: Update API Calls

```javascript
// client/src/config.js
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Update axios calls
import { API_URL } from './config';
axios.get(`${API_URL}/api/attendance`);
```

#### Step 4: Deploy to Render

1. New → Static Site
2. Connect repository
3. Configure:
   - **Build Command:** `cd client && npm install && npm run build`
   - **Publish Directory:** `client/dist`
4. Add Environment Variable:
   - `VITE_API_URL`: your backend URL
5. Deploy

---

### Option 2: Deploy to Vercel

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
vercel login
```

#### Step 2: Configure

```json
// vercel.json in client directory
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "VITE_API_URL": "https://your-backend.onrender.com"
  }
}
```

#### Step 3: Deploy

```bash
cd client
vercel

# For production
vercel --prod
```

---

### Option 3: Deploy to Netlify

#### Step 1: Create `netlify.toml`

```toml
# client/netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://your-backend.onrender.com"
```

#### Step 2: Deploy

1. Go to https://netlify.com
2. New site from Git
3. Connect repository
4. Configure:
   - **Build command:** `cd client && npm run build`
   - **Publish directory:** `client/dist`
5. Add environment variables
6. Deploy

---

## 🌐 Domain & SSL

### Custom Domain Setup

#### For Render:
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records (CNAME or A record)
4. SSL automatically provisioned

#### For Vercel:
1. Settings → Domains
2. Add domain
3. Update DNS
4. SSL automatic

#### For Netlify:
1. Domain settings → Add custom domain
2. Update DNS
3. SSL automatic

### DNS Configuration

```
# For frontend (example.com)
Type: A
Name: @
Value: [Your hosting provider IP]

# For backend (api.example.com)
Type: CNAME
Name: api
Value: your-backend.onrender.com

# Or use subdomain
Type: CNAME
Name: app
Value: your-frontend.netlify.app
```

---

## 📊 Monitoring & Maintenance

### Application Monitoring

#### 1. Render Dashboard
- View logs
- Monitor CPU/Memory
- Check uptime

#### 2. MongoDB Atlas
- Monitor database performance
- Set up alerts
- View query performance

#### 3. Error Tracking (Optional)

**Sentry Integration:**

```bash
npm install @sentry/react @sentry/node
```

```javascript
// Frontend
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});

// Backend
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your-sentry-dsn",
});
```

### Backup Strategy

#### 1. MongoDB Atlas Backups
- Automatic backups enabled
- Point-in-time recovery
- Download backups manually

#### 2. Manual Backup

```bash
# Export data
mongodump --uri="your-mongodb-uri" --out=backup

# Import data
mongorestore --uri="your-mongodb-uri" backup/
```

### Health Checks

#### 1. Uptime Monitoring

Use services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

Configure to check:
- `https://your-backend.com/health`
- `https://your-frontend.com`

#### 2. Automated Testing

```yaml
# .github/workflows/health-check.yml
name: Health Check
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - name: Check Backend
        run: curl -f https://your-backend.com/health || exit 1
      
      - name: Check Frontend
        run: curl -f https://your-frontend.com || exit 1
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:**
```javascript
// server/index.js
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

Update `CLIENT_URL` in environment variables.

---

#### 2. MongoDB Connection Failed

**Problem:** Can't connect to MongoDB Atlas

**Solutions:**
- Check connection string format
- Verify username/password
- Check IP whitelist (add 0.0.0.0/0)
- Ensure cluster is running

---

#### 3. Build Failures

**Problem:** Deployment build fails

**Solutions:**
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Test build locally: `npm run build`
- Check build logs for specific errors

---

#### 4. Environment Variables Not Loading

**Problem:** App can't read environment variables

**Solutions:**
- Verify variable names (no typos)
- Restart application after adding variables
- Check if using correct prefix (VITE_ for frontend)
- Ensure dotenv is loaded: `require('dotenv').config()`

---

#### 5. 502 Bad Gateway

**Problem:** Backend not responding

**Solutions:**
- Check if server is running
- Verify PORT environment variable
- Check server logs
- Ensure MongoDB is accessible

---

## 📝 Post-Deployment Checklist

After deployment:

- [ ] Test all features in production
- [ ] Verify database connections
- [ ] Check all API endpoints
- [ ] Test check-in/check-out flow
- [ ] Verify admin dashboard
- [ ] Test CSV export
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Update documentation with URLs
- [ ] Share with stakeholders

---

## 🎯 Production URLs Template

```markdown
## Production Deployment

- **Frontend:** https://lab-attendance.netlify.app
- **Backend API:** https://lab-attendance-api.onrender.com
- **Admin Dashboard:** https://lab-attendance.netlify.app/admin
- **Health Check:** https://lab-attendance-api.onrender.com/health

## Credentials

- **MongoDB Atlas:** [Dashboard Link]
- **Hosting:** [Provider Dashboard]
- **Domain:** [Domain Registrar]
```

---

## 🚀 Quick Deployment Commands

```bash
# Build and test locally
cd client && npm run build
cd ../server && npm start

# Deploy to Render (via Git)
git add .
git commit -m "Deploy to production"
git push origin main

# Deploy to Vercel
cd client && vercel --prod

# Deploy to Railway
cd server && railway up
```

---

**Deployment Guide Version:** 1.0  
**Last Updated:** December 20, 2025  
**Maintained by:** LIVEWIRE Kasaragod

---

## 📞 Support

For deployment issues:
- Check logs first
- Review this guide
- Search GitHub issues
- Create new issue with details
