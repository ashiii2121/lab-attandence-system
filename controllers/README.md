# Controllers Directory

This directory contains the application controllers that handle HTTP requests and responses for the Lab Attendance System.

## 📁 Files

### `control.js`
Main controller file containing all route handlers and business logic.

## 🎯 Controller Functions

### Page Rendering Controllers

#### `gethomepage(req, res)`
- **Purpose**: Renders the main homepage
- **Route**: `GET /`
- **Template**: `main.ejs`
- **Description**: Displays the main interface with Start Session and Exit Session options

#### `getstartpage(req, res)`
- **Purpose**: Renders the student check-in page
- **Route**: `GET /start`
- **Template**: `start.ejs`
- **Description**: Shows form for students to enter their name and start a session

#### `getexitpage(req, res)`
- **Purpose**: Renders the student check-out page
- **Route**: `GET /exit`
- **Template**: `exit.ejs`
- **Description**: Shows form for students to enter their token and exit session

#### `gettokenpage(req, res)`
- **Purpose**: Renders the token display page
- **Route**: `GET /token`
- **Template**: `token.ejs`
- **Data**: `{ token: tokenCount }`
- **Description**: Displays the generated token number to the student

#### `getadminpage(req, res)`
- **Purpose**: Renders the admin dashboard
- **Route**: `GET /admin`
- **Template**: `admin.ejs`
- **Description**: Shows attendance records and management interface

### Data Processing Controllers

#### `createpage(req, res)`
- **Purpose**: Creates a new attendance record for student entry
- **Route**: `POST /create`
- **Parameters**: 
  - `req.body.name` - Student's name
- **Process**:
  1. Increments token counter
  2. Creates new user record in database
  3. Renders token page with generated token
- **Database**: Creates record with name, token, and entry time
- **Response**: Renders `token.ejs` with token number

#### `Exitpage(req, res)`
- **Purpose**: Updates attendance record with exit time
- **Route**: `POST /exitpage`
- **Parameters**:
  - `req.body.token` - Student's token number
- **Process**:
  1. Validates token input
  2. Updates database record with exit time
  3. Returns JSON response
- **Validation**: Checks if token exists
- **Response**: JSON with success status and exit time

#### `Entrypage(req, res)`
- **Purpose**: Records entry information (alternative entry method)
- **Route**: `POST /entry`
- **Parameters**:
  - `req.body.name` - Student's name
- **Process**:
  1. Creates timestamp
  2. Adds to entries array
  3. Returns JSON response
- **Response**: JSON with entry data

#### `createIncrement(req, res)`
- **Purpose**: Increments token counter (utility function)
- **Route**: `POST /increment`
- **Process**:
  1. Increments tokenCount
  2. Updates Counter collection
  3. Redirects to homepage
- **Error Handling**: Catches and logs database errors

## 🔧 Global Variables

### `tokenCount`
- **Type**: Number
- **Initial Value**: 0
- **Purpose**: Tracks the current token number for new sessions
- **Usage**: Incremented for each new student entry

## 📊 Database Operations

### Create Operations
- **Function**: `createpage()`
- **Collection**: Users (via Attendance model)
- **Fields**: name, token, Entry (auto-generated)

### Update Operations
- **Function**: `Exitpage()`
- **Collection**: Users (via Attendance model)
- **Operation**: Updates exit_time field using token as identifier

### Counter Operations
- **Function**: `createIncrement()`
- **Collection**: Counter
- **Operation**: Upsert token count value

## 🚨 Error Handling

### Database Errors
- Try-catch blocks for async operations
- Console error logging
- HTTP 500 status for server errors

### Validation Errors
- Token validation in `Exitpage()`
- HTTP 400 status for missing required fields
- HTTP 404 status for token not found

## 🔄 Response Types

### Template Rendering
- Uses `res.render()` for EJS templates
- Passes data objects to templates

### JSON Responses
- Success/error status indicators
- Descriptive error messages
- Data payload for successful operations

### Redirects
- `res.redirect("/")` after successful operations

## 📝 Dependencies

- `../models/model` - Database model for attendance records
- `../routers/route` - Route definitions (imported but not used)

## 🔮 Future Improvements

- [ ] Add input validation middleware
- [ ] Implement proper error handling middleware
- [ ] Add logging system
- [ ] Separate business logic from route handlers
- [ ] Add unit tests for controller functions
- [ ] Implement authentication for admin routes
