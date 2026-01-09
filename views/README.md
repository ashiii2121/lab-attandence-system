# Views Directory

This directory contains the EJS (Embedded JavaScript) templates for the Lab Attendance System's user interface.

## 📁 Files Overview

| File | Purpose | Route | Description |
|------|---------|-------|-------------|
| `main.ejs` | Homepage | `GET /` | Main interface with session options |
| `start.ejs` | Check-in | `GET /start` | Student entry form |
| `exit.ejs` | Check-out | `GET /exit` | Student exit form |
| `token.ejs` | Token Display | After check-in | Shows generated token |
| `admin.ejs` | Admin Panel | `GET /admin` | Attendance management |
| `token.js` | Client Script | - | JavaScript for token page |

## 🎨 Template Structure

### Common Elements

#### Header Section
All templates include:
- HTML5 doctype and meta tags
- Responsive viewport settings
- FontAwesome 6.0 icons
- Custom CSS stylesheets

#### Layout Pattern
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lab Attendance System</title>
  <link rel="stylesheet" href="[stylesheet].css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
  <div class="sliding-background">
    <div class="container">
      <div id="lab">
        <!-- Content -->
      </div>
    </div>
  </div>
</body>
</html>
```

## 📄 Template Details

### `main.ejs` - Homepage
**Purpose**: Main landing page with navigation options

**Features**:
- Real-time clock display
- "Start Session" button → `/start`
- "Exit Session" button → `/exit`
- LIVEWIRE Kasaragod branding
- Animated background

**CSS**: `1.css`
**JavaScript**: `lab.js`

**Key Elements**:
```html
<button class="button start-session">
  <a href="/start">Start Session</a>
</button>
<button class="button exit-session">
  <a href="/exit">Exit Session</a>
</button>
```

### `start.ejs` - Student Check-in
**Purpose**: Form for students to register their entry

**Features**:
- Name input field
- Submit button to create attendance record
- Go Back navigation
- Real-time clock

**CSS**: `start.css`
**JavaScript**: `lab1.js`

**Form Structure**:
```html
<form action="/create" method="post">
  <input type="text" name="name" placeholder="Enter Your Name" required>
  <button type="submit">Submit</button>
</form>
```

### `exit.ejs` - Student Check-out
**Purpose**: Form for students to exit using token

**Features**:
- Token number input field
- Exit button to update attendance
- "Forget" link to admin panel
- Go Back navigation

**CSS**: `token.css`
**JavaScript**: `lab2.js`

**Form Structure**:
```html
<form action="/exitpage" method="post">
  <input type="text" name="token" placeholder="Enter Your Token Number" required>
  <button type="submit">Exit</button>
</form>
<div class="forget">
  <a href="/admin">forget</a>
</div>
```

### `token.ejs` - Token Display
**Purpose**: Shows generated token to student after check-in

**Features**:
- Dynamic token number display
- Session confirmation
- Instructions for exit process

**Data Binding**:
```html
<div class="token-display">
  Token Number: <%= token %>
</div>
```

### `admin.ejs` - Admin Dashboard
**Purpose**: Administrative interface for viewing attendance

**Features**:
- Attendance table with columns:
  - Token Number
  - Student Name  
  - Entry Time
  - Exit Time
- Responsive table design
- Clean administrative styling

**Table Structure**:
```html
<table>
  <thead>
    <tr>
      <th>Token.No</th>
      <th>Name</th>
      <th>Entry</th>
      <th>Exit</th>
    </tr>
  </thead>
  <tbody>
    <!-- Dynamic content should be added here -->
  </tbody>
</table>
```

## 🎯 Interactive Elements

### Navigation Flow
```
main.ejs → start.ejs → token.ejs
    ↓         ↑
exit.ejs ← admin.ejs
```

### Form Submissions
- **Start Session**: `POST /create` with name
- **Exit Session**: `POST /exitpage` with token
- **Admin Access**: Direct link from exit page

## 🎨 Styling Architecture

### CSS Files Used
- `1.css` - Main homepage styles
- `start.css` - Check-in page styles  
- `token.css` - Exit page and token styles
- `style.css` - General styles (if used)

### Design Features
- Sliding background animations
- FontAwesome icons for visual appeal
- Responsive button designs
- Modern card-based layouts
- Real-time clock displays

## 📱 Responsive Design

### Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Mobile Considerations
- Touch-friendly button sizes
- Readable font sizes
- Flexible layouts
- Optimized form inputs

## ⚡ Client-Side JavaScript

### `token.js`
- Handles token page interactions
- May include validation logic
- Token display enhancements

### Embedded Scripts
- `lab.js` - Homepage interactions
- `lab1.js` - Start page functionality  
- `lab2.js` - Exit page functionality

### Common Features
- Real-time clock updates
- Form validation
- Navigation handling
- User feedback

## 🔧 EJS Features Used

### Template Syntax
```ejs
<!-- Variable output -->
<%= variable %>

<!-- Raw HTML output -->
<%- htmlContent %>

<!-- JavaScript execution -->
<% if (condition) { %>
  <!-- Conditional content -->
<% } %>
```

### Data Passing
Controllers pass data to templates:
```javascript
res.render('token', { token: tokenCount });
```

## 🚨 Current Issues

1. **Static Admin Data**: Admin table shows hardcoded data
2. **Missing Error Pages**: No 404 or error templates
3. **Limited Validation**: Client-side validation could be enhanced
4. **Accessibility**: Missing ARIA labels and semantic HTML
5. **SEO**: Missing meta descriptions and structured data

## 🔮 Recommended Improvements

### Template Enhancements
- [ ] Add error handling templates
- [ ] Implement dynamic admin data
- [ ] Add loading states
- [ ] Include success/error messages
- [ ] Add form validation feedback

### Accessibility Improvements
```html
<!-- Better semantic HTML -->
<main role="main">
  <section aria-labelledby="attendance-form">
    <h2 id="attendance-form">Student Check-in</h2>
    <form aria-describedby="form-help">
      <label for="student-name">Student Name</label>
      <input id="student-name" type="text" required 
             aria-describedby="name-help">
      <div id="name-help">Enter your full name</div>
    </form>
  </section>
</main>
```

### Performance Optimizations
- [ ] Minimize CSS and JavaScript
- [ ] Optimize images
- [ ] Add service worker for offline functionality
- [ ] Implement lazy loading

## 📝 Dependencies

- **EJS**: Template engine for rendering dynamic content
- **FontAwesome**: Icon library for UI elements
- **Custom CSS**: Project-specific styling
- **Vanilla JavaScript**: Client-side interactivity

## 🔗 Related Files

- `../public/*.css` - Stylesheets for visual design
- `../public/*.js` - Client-side JavaScript files
- `../controllers/control.js` - Controllers that render these templates
- `../routers/route.js` - Routes that serve these templates
