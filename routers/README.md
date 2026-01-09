# Routers Directory

This directory contains the Express.js route definitions for the Lab Attendance System.

## 📁 Files

### `route.js`
Main routing file that defines all HTTP endpoints and maps them to controller functions.

## 🛣️ Route Definitions

### GET Routes (Page Rendering)

| Route | Controller | Purpose | Template |
|-------|------------|---------|----------|
| `GET /` | `gethomepage` | Main homepage | `main.ejs` |
| `GET /start` | `getstartpage` | Student check-in page | `start.ejs` |
| `GET /exit` | `getexitpage` | Student check-out page | `exit.ejs` |
| `GET /token` | `gettokenpage` | Token display page | `token.ejs` |
| `GET /admin` | `getadminpage` | Admin dashboard | `admin.ejs` |

### POST Routes (Data Processing)

| Route | Controller | Purpose | Request Body |
|-------|------------|---------|--------------|
| `POST /create` | `createpage` | Create attendance record | `{ name: string }` |
| `POST /increment` | `createIncrement` | Increment token counter | `{}` |
| `POST /exitpage` | `Exitpage` | Update exit time | `{ token: number }` |
| `POST /entry` | `Entrypage` | Alternative entry method | `{ name: string }` |

## 🔧 Router Configuration

### Express Router Setup
```javascript
const express = require('express');
const route = express.Router();
```

### Controller Imports
```javascript
const { 
  gethomepage, 
  getstartpage, 
  getexitpage, 
  gettokenpage, 
  getadminpage, 
  createpage, 
  createIncrement, 
  Exitpage, 
  Entrypage 
} = require('../controllers/control');
```

### Model Imports
```javascript
const { create } = require('../models/model');
```
*Note: This import appears unused in the current implementation*

## 🌐 Route Flow

### Student Check-in Flow
1. `GET /` → Homepage with "Start Session" button
2. `GET /start` → Check-in form
3. `POST /create` → Process entry, generate token
4. Redirect to token display page

### Student Check-out Flow
1. `GET /` → Homepage with "Exit Session" button
2. `GET /exit` → Check-out form
3. `POST /exitpage` → Process exit, update record
4. JSON response with confirmation

### Admin Flow
1. `GET /admin` → Admin dashboard
2. View attendance records and statistics

## 📊 Request/Response Patterns

### GET Routes
- **Input**: URL parameters (none currently used)
- **Output**: Rendered EJS templates
- **Purpose**: Display user interfaces

### POST Routes
- **Input**: Form data via `req.body`
- **Output**: Template rendering or JSON responses
- **Purpose**: Process form submissions and data updates

## 🔒 Middleware

### Current Middleware
- Express Router built-in middleware
- Body parsing handled at application level (`express.urlencoded`)

### Missing Middleware (Recommendations)
- [ ] Authentication middleware for admin routes
- [ ] Input validation middleware
- [ ] Rate limiting middleware
- [ ] CORS middleware (if needed for API access)
- [ ] Logging middleware

## 🚨 Security Considerations

### Current Issues
1. **No Authentication**: Admin routes are publicly accessible
2. **No Input Validation**: Raw form data processed without validation
3. **No Rate Limiting**: Potential for abuse of POST endpoints
4. **No CSRF Protection**: Forms vulnerable to cross-site request forgery

### Recommended Security Enhancements
```javascript
// Example security middleware
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Input validation
const validateEntry = [
  body('name').trim().isLength({ min: 2, max: 50 }).escape(),
  body('token').optional().isNumeric()
];
```

## 🔄 Error Handling

### Current Error Handling
- Basic error handling in controllers
- No route-level error handling

### Recommended Error Handling
```javascript
// 404 handler
route.use('*', (req, res) => {
  res.status(404).render('error', { 
    message: 'Page not found' 
  });
});

// Error handling middleware
route.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    message: 'Something went wrong!' 
  });
});
```

## 📝 Dependencies

- **express**: Web framework for Node.js
- **../controllers/control**: Controller functions
- **../models/model**: Database models (imported but unused)

## 🔮 Future Enhancements

### API Versioning
```javascript
// Version 1 routes
route.use('/api/v1', v1Routes);

// Version 2 routes  
route.use('/api/v2', v2Routes);
```

### RESTful API Routes
```javascript
// RESTful attendance routes
route.get('/api/attendance', getAllAttendance);
route.get('/api/attendance/:id', getAttendanceById);
route.post('/api/attendance', createAttendance);
route.put('/api/attendance/:id', updateAttendance);
route.delete('/api/attendance/:id', deleteAttendance);
```

### Route Organization
- [ ] Separate routes by feature (attendance, admin, auth)
- [ ] Add route parameter validation
- [ ] Implement route documentation
- [ ] Add OpenAPI/Swagger documentation
- [ ] Create route testing suite

## 🔗 Related Files

- `../controllers/control.js` - Controller functions used by routes
- `../models/model.js` - Database models (should be utilized)
- `../index.js` - Main app file that uses these routes
- `../views/*.ejs` - Templates rendered by GET routes
