const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  token: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  Entry: { 
    type: Date, 
    default: Date.now,
    required: true
  },
  Exit: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
