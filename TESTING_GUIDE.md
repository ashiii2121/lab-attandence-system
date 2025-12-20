# 🧪 Testing Guide - Lab Attendance System

**Version:** 1.0  
**Last Updated:** December 20, 2025

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup for Testing](#setup-for-testing)
3. [Backend Testing](#backend-testing)
4. [Frontend Testing](#frontend-testing)
5. [Integration Testing](#integration-testing)
6. [Admin Dashboard Testing](#admin-dashboard-testing)
7. [Error Handling Testing](#error-handling-testing)
8. [Performance Testing](#performance-testing)
9. [Security Testing](#security-testing)
10. [Mobile Responsiveness Testing](#mobile-responsiveness-testing)

---

## ✅ Prerequisites

Before testing, ensure you have:

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running
- [ ] All dependencies installed
- [ ] Environment variables configured

---

## 🚀 Setup for Testing

### 1. Install Dependencies

```bash
# Root dependencies (if needed)
cd lab-attandence-system
npm install

# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
# Server environment
cd server
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start MongoDB

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod

# Verify
mongo --eval "db.version()"
```

---

## 🔧 Backend Testing

### Test 1: Server Startup

**Objective:** Verify server starts without errors

```bash
cd server
npm start
```

**Expected Output:**
```
✅ MongoDB Connected: 127.0.0.1
🚀 Server is running on port 5000
📍 Environment: development
```

**Pass Criteria:**
- [ ] No error messages
- [ ] MongoDB connection successful
- [ ] Server listening on port 5000

---

### Test 2: Health Check Endpoint

**Objective:** Verify health endpoint responds

```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

**Pass Criteria:**
- [ ] Status code: 200
- [ ] Response contains "OK"

---

### Test 3: Create Attendance Record

**Objective:** Test attendance creation

```bash
curl -X POST http://localhost:5000/api/create \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "notes": "Testing"}'
```

**Expected Response:**
```json
{
  "token": 1
}
```

**Pass Criteria:**
- [ ] Status code: 201
- [ ] Token number returned
- [ ] Token is a number

---

### Test 4: Get All Attendance

**Objective:** Retrieve all records

```bash
curl http://localhost:5000/api/attendance
```

**Expected Response:**
```json
[
  {
    "_id": "...",
    "name": "Test User",
    "token": 1,
    "Entry": "2025-12-20T...",
    "Exit": null,
    "notes": "Testing",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

**Pass Criteria:**
- [ ] Status code: 200
- [ ] Array of records returned
- [ ] Record contains all fields

---

### Test 5: Record Exit

**Objective:** Update exit time

```bash
curl -X POST http://localhost:5000/api/exitpage \
  -H "Content-Type: application/json" \
  -d '{"token": 1}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Exit time recorded successfully",
  "exit_time": "2025-12-20T..."
}
```

**Pass Criteria:**
- [ ] Status code: 200
- [ ] Success is true
- [ ] Exit time returned

---

### Test 6: Rate Limiting

**Objective:** Verify rate limiting works

```bash
# Make 101 requests quickly
for i in {1..101}; do
  curl http://localhost:5000/api/attendance
done
```

**Expected:** 101st request should be rate limited

**Pass Criteria:**
- [ ] First 100 requests succeed
- [ ] 101st request returns 429
- [ ] Error message about rate limit

---

### Test 7: CORS Headers

**Objective:** Verify CORS headers present

```bash
curl -I http://localhost:5000/health
```

**Expected Headers:**
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
```

**Pass Criteria:**
- [ ] CORS headers present
- [ ] Origin matches client URL

---

### Test 8: Security Headers (Helmet)

**Objective:** Verify security headers

```bash
curl -I http://localhost:5000/health
```

**Expected Headers:**
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
```

**Pass Criteria:**
- [ ] Security headers present
- [ ] No sensitive info exposed

---

## 🎨 Frontend Testing

### Test 1: Client Startup

**Objective:** Verify client starts

```bash
cd client
npm run dev
```

**Expected Output:**
```
VITE v7.0.5  ready in XXX ms
➜  Local:   http://localhost:5173/
```

**Pass Criteria:**
- [ ] No error messages
- [ ] Server starts on port 5173
- [ ] URL displayed

---

### Test 2: Homepage Load

**Objective:** Verify homepage loads

**Steps:**
1. Open browser
2. Navigate to http://localhost:5173
3. Observe page

**Expected:**
- [ ] Page loads without errors
- [ ] "LAB ATTENDANCE SYSTEM" title visible
- [ ] Real-time clock updating
- [ ] "Start Session" button visible
- [ ] "Exit Session" button visible
- [ ] Background slideshow working
- [ ] Icons displaying (FontAwesome)

---

### Test 3: Check-In Flow

**Objective:** Test student check-in

**Steps:**
1. Click "Start Session"
2. Enter name: "Test Student"
3. Enter notes: "Testing check-in"
4. Click "Submit"

**Expected:**
- [ ] Redirects to token page
- [ ] Token number displayed
- [ ] Token is a number
- [ ] Auto-redirects to home after 4 seconds

---

### Test 4: Check-Out Flow

**Objective:** Test student check-out

**Steps:**
1. Click "Exit Session"
2. Enter token number from check-in
3. Click "Exit"

**Expected:**
- [ ] Success message appears
- [ ] Redirects to homepage
- [ ] No errors in console

---

### Test 5: Loading States

**Objective:** Verify loading indicators

**Steps:**
1. Click "Start Session"
2. Enter name
3. Click "Submit"
4. Observe

**Expected:**
- [ ] Button shows "Submitting..."
- [ ] Button is disabled
- [ ] Input fields disabled
- [ ] Loading indicator visible

---

## 📊 Admin Dashboard Testing

### Test 1: Dashboard Access

**Objective:** Access admin dashboard

**Steps:**
1. Navigate to http://localhost:5173/admin

**Expected:**
- [ ] Dashboard loads
- [ ] Statistics cards visible
- [ ] Search bar present
- [ ] Refresh button visible
- [ ] Export CSV button visible
- [ ] Table with records visible

---

### Test 2: Statistics Cards

**Objective:** Verify statistics accuracy

**Steps:**
1. Create 3 attendance records
2. Exit 1 record
3. Refresh admin dashboard

**Expected:**
- [ ] Total Sessions: 3
- [ ] Active Now: 2
- [ ] Completed: 1

---

### Test 3: Search Functionality

**Objective:** Test real-time search

**Steps:**
1. Enter "Test" in search bar
2. Observe table

**Expected:**
- [ ] Table filters in real-time
- [ ] Only matching records shown
- [ ] Record counter updates
- [ ] "Showing X of Y records" displayed

---

### Test 4: CSV Export

**Objective:** Test data export

**Steps:**
1. Click "Export CSV" button
2. Check downloads folder

**Expected:**
- [ ] CSV file downloads
- [ ] Filename: `attendance_YYYY-MM-DD.csv`
- [ ] File contains all records
- [ ] Headers: Token, Name, Entry, Exit, Duration, Status, Notes

---

### Test 5: Auto-Refresh

**Objective:** Verify auto-refresh works

**Steps:**
1. Open admin dashboard
2. In another tab, create new record
3. Wait 30 seconds
4. Check admin dashboard

**Expected:**
- [ ] New record appears automatically
- [ ] Statistics update
- [ ] No page reload needed

---

### Test 6: Duration Calculation

**Objective:** Verify session duration

**Steps:**
1. Create record at 10:00 AM
2. Exit record at 12:30 PM
3. Check admin dashboard

**Expected:**
- [ ] Duration shows "2h 30m"
- [ ] Calculation is accurate
- [ ] Active sessions show "Active"

---

### Test 7: Status Indicators

**Objective:** Verify status display

**Steps:**
1. Create 2 records
2. Exit 1 record
3. Check admin dashboard

**Expected:**
- [ ] Active record shows "🟢 Active" in green
- [ ] Completed record shows "✅ Completed" in gray
- [ ] Colors are correct

---

### Test 8: Empty State

**Objective:** Test empty dashboard

**Steps:**
1. Clear all records from database
2. Refresh admin dashboard

**Expected:**
- [ ] "📭 No Records Found" message
- [ ] "No attendance records yet." text
- [ ] "Back to Home" link visible

---

### Test 9: Error State

**Objective:** Test error handling

**Steps:**
1. Stop backend server
2. Refresh admin dashboard

**Expected:**
- [ ] Error message displayed
- [ ] "⚠️ Error" heading
- [ ] Retry button visible
- [ ] "Back to Home" link visible

---

## 🛡️ Error Handling Testing

### Test 1: Error Boundary

**Objective:** Test React error catching

**Steps:**
1. Trigger a React error (modify component to throw)
2. Observe

**Expected:**
- [ ] Error boundary catches error
- [ ] User-friendly error page shown
- [ ] "Reload Page" button works
- [ ] "Go Home" link works
- [ ] Error details in dev mode

---

### Test 2: 404 Page

**Objective:** Test invalid routes

**Steps:**
1. Navigate to http://localhost:5173/invalid-page

**Expected:**
- [ ] 404 page displayed
- [ ] "404" large text
- [ ] "Page Not Found" message
- [ ] "Back to Home" button
- [ ] Quick links to main pages

---

### Test 3: API Error Handling

**Objective:** Test API error responses

**Steps:**
1. Stop backend
2. Try to create record

**Expected:**
- [ ] Error message displayed
- [ ] "Cannot connect to server" message
- [ ] User-friendly error text
- [ ] No app crash

---

## 📱 Mobile Responsiveness Testing

### Test 1: Mobile View (375px)

**Objective:** Test on mobile screen

**Steps:**
1. Open DevTools
2. Set viewport to 375x667 (iPhone SE)
3. Test all pages

**Expected:**
- [ ] All content visible
- [ ] No horizontal scroll
- [ ] Buttons accessible
- [ ] Text readable
- [ ] Forms usable

---

### Test 2: Tablet View (768px)

**Objective:** Test on tablet screen

**Steps:**
1. Set viewport to 768x1024 (iPad)
2. Test all pages

**Expected:**
- [ ] Layout adjusts properly
- [ ] Admin table scrollable
- [ ] Statistics cards stack nicely

---

### Test 3: Desktop View (1920px)

**Objective:** Test on large screen

**Steps:**
1. Set viewport to 1920x1080
2. Test all pages

**Expected:**
- [ ] Content centered
- [ ] Max-width respected
- [ ] No excessive whitespace

---

## ⚡ Performance Testing

### Test 1: Page Load Time

**Objective:** Measure load performance

**Steps:**
1. Open DevTools Network tab
2. Hard refresh homepage
3. Check load time

**Expected:**
- [ ] Initial load < 2 seconds
- [ ] DOMContentLoaded < 1 second
- [ ] All resources load

---

### Test 2: API Response Time

**Objective:** Measure API speed

**Steps:**
1. Use DevTools Network tab
2. Create attendance record
3. Check response time

**Expected:**
- [ ] Response time < 500ms
- [ ] No timeout errors

---

### Test 3: Large Dataset

**Objective:** Test with many records

**Steps:**
1. Create 100 attendance records
2. Load admin dashboard
3. Test search

**Expected:**
- [ ] Dashboard loads in < 3 seconds
- [ ] Search is responsive
- [ ] No lag or freezing

---

## 🔐 Security Testing

### Test 1: Environment Variables

**Objective:** Verify secrets not exposed

**Steps:**
1. Check browser DevTools
2. View page source
3. Check network requests

**Expected:**
- [ ] No .env values visible
- [ ] No database credentials
- [ ] No JWT secrets

---

### Test 2: Input Validation

**Objective:** Test input sanitization

**Steps:**
1. Try to submit empty name
2. Try to submit very long name (200 chars)
3. Try to submit special characters

**Expected:**
- [ ] Empty name rejected
- [ ] Long name rejected (>100 chars)
- [ ] Special chars handled safely

---

### Test 3: SQL Injection Attempt

**Objective:** Test against injection

**Steps:**
1. Enter: `'; DROP TABLE users; --` as name
2. Submit

**Expected:**
- [ ] Input sanitized
- [ ] No database damage
- [ ] Record created safely

---

## ✅ Testing Checklist Summary

### Backend (8/8)
- [ ] Server startup
- [ ] Health check
- [ ] Create record
- [ ] Get records
- [ ] Update exit
- [ ] Rate limiting
- [ ] CORS headers
- [ ] Security headers

### Frontend (5/5)
- [ ] Client startup
- [ ] Homepage load
- [ ] Check-in flow
- [ ] Check-out flow
- [ ] Loading states

### Admin Dashboard (9/9)
- [ ] Dashboard access
- [ ] Statistics cards
- [ ] Search functionality
- [ ] CSV export
- [ ] Auto-refresh
- [ ] Duration calculation
- [ ] Status indicators
- [ ] Empty state
- [ ] Error state

### Error Handling (3/3)
- [ ] Error boundary
- [ ] 404 page
- [ ] API errors

### Mobile (3/3)
- [ ] Mobile view
- [ ] Tablet view
- [ ] Desktop view

### Performance (3/3)
- [ ] Page load time
- [ ] API response time
- [ ] Large dataset

### Security (3/3)
- [ ] Environment variables
- [ ] Input validation
- [ ] Injection protection

---

## 🐛 Bug Reporting

If you find any issues during testing:

1. **Document the bug:**
   - What you did
   - What you expected
   - What actually happened
   - Screenshots if applicable

2. **Check console:**
   - Browser console errors
   - Server console errors
   - Network tab errors

3. **Create GitHub issue:**
   - Use bug report template
   - Include all details
   - Add labels

---

## 📊 Test Results Template

```markdown
## Test Results - [Date]

### Backend Tests
- Server Startup: ✅ Pass
- Health Check: ✅ Pass
- Create Record: ✅ Pass
- Get Records: ✅ Pass
- Update Exit: ✅ Pass
- Rate Limiting: ✅ Pass
- CORS: ✅ Pass
- Security Headers: ✅ Pass

### Frontend Tests
- Client Startup: ✅ Pass
- Homepage Load: ✅ Pass
- Check-In Flow: ✅ Pass
- Check-Out Flow: ✅ Pass
- Loading States: ✅ Pass

### Admin Dashboard Tests
- Dashboard Access: ✅ Pass
- Statistics: ✅ Pass
- Search: ✅ Pass
- CSV Export: ✅ Pass
- Auto-Refresh: ✅ Pass
- Duration: ✅ Pass
- Status: ✅ Pass
- Empty State: ✅ Pass
- Error State: ✅ Pass

### Overall: ✅ All Tests Passed
```

---

## 🎯 Next Steps After Testing

1. **If all tests pass:**
   - Document test results
   - Proceed to deployment
   - Create production build

2. **If tests fail:**
   - Document failures
   - Fix issues
   - Re-test
   - Update documentation

---

**Testing Guide Version:** 1.0  
**Last Updated:** December 20, 2025  
**Maintained by:** LIVEWIRE Kasaragod
