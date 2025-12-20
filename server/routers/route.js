const express = require('express');
const { getAttendance, createpage, Exitpage } = require('../controllers/control');

const route = express.Router();

// Public routes
route.post('/create', createpage);
route.post('/exitpage', Exitpage);

// Admin routes (TODO: Add authentication middleware)
route.get('/attendance', getAttendance);

module.exports = route;


