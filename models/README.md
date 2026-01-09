# Models Directory

This directory contains the database models and schemas for the Lab Attendance System using Mongoose ODM.

## 📁 Files

### `model.js`
Main model file containing the attendance schema and database model definition.

## 🗃️ Database Schema

### AttendanceSchema
The main schema for storing student attendance records.

#### Schema Definition
```javascript
const AttandenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  token: { type: Number },
  Entry: { type: Date, default: Date.now },
  Exit: { type: Date, default: Date.now }
});
```

#### Fields Description

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | String | ✅ Yes | - | Student's full name |
| `token` | Number | ❌ No | - | Unique token number for session |
| `Entry` | Date | ❌ No | `Date.now` | Entry timestamp |
| `Exit` | Date | ❌ No | `Date.now` | Exit timestamp |

## 🏷️ Model Export

### Attendance Model
```javascript
const Attandence = mongoose.model('User', AttandenceSchema);
module.exports = Attandence;
```

- **Model Name**: `User` (collection name in MongoDB)
- **Schema**: `AttandenceSchema`
- **Export**: Default export for use in controllers

## 📊 Database Operations

### Supported Operations

#### Create
- **Usage**: `Attandence.create({ name, token })`
- **Purpose**: Create new attendance record when student starts session
- **Required Fields**: `name`
- **Auto-generated**: `Entry` timestamp

#### Find and Update
- **Usage**: `Attandence.findOneAndUpdate({ token }, { $set: { exit_time } })`
- **Purpose**: Update exit time when student ends session
- **Query**: By token number
- **Update**: Exit timestamp

#### Find
- **Usage**: `Attandence.find({})`
- **Purpose**: Retrieve attendance records for admin dashboard
- **Returns**: Array of attendance documents

## 🔧 Mongoose Features Used

### Schema Types
- **String**: For student names
- **Number**: For token identification
- **Date**: For timestamp tracking

### Schema Options
- **required**: Ensures name field is mandatory
- **default**: Auto-generates timestamps
- **type**: Explicit type definitions

## 📝 Collection Information

### MongoDB Collection
- **Collection Name**: `users` (pluralized from model name 'User')
- **Database**: `mongodb-3` (as defined in connection.js)
- **Connection**: Local MongoDB instance on port 27017

## 🚨 Known Issues

1. **Naming Inconsistency**: 
   - Schema named `AttandenceSchema` (typo: should be "Attendance")
   - Model named `User` (should be "Attendance" for clarity)

2. **Exit Field Logic**:
   - Exit field has default `Date.now` which may not be intended
   - Should probably be `null` or `undefined` initially

3. **Missing Validation**:
   - No validation for token uniqueness
   - No validation for name format
   - No validation for date ranges

## 🔮 Suggested Improvements

### Schema Enhancements
```javascript
const AttendanceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  token: { 
    type: Number,
    unique: true,
    required: true
  },
  entryTime: { 
    type: Date, 
    default: Date.now 
  },
  exitTime: { 
    type: Date,
    default: null
  },
  labSession: {
    type: String,
    enum: ['morning', 'afternoon', 'evening']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});
```

### Additional Features
- [ ] Add student ID field
- [ ] Add lab room/section field
- [ ] Add session duration calculation
- [ ] Add attendance status enum
- [ ] Implement soft delete functionality
- [ ] Add indexes for better query performance

## 📚 Dependencies

- **mongoose**: MongoDB object modeling library
- **mongodb**: Underlying MongoDB driver (via mongoose)

## 🔗 Related Files

- `../controllers/control.js` - Uses this model for CRUD operations
- `../connection.js` - Establishes database connection
- `../index.js` - Imports connection setup
