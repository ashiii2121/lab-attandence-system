const express = require('express')
const { gethomepage, getstartpage, getexitpage, gettokenpage, getAttendance, createpage, Exitpage } = require('../controllers/control')

const route = express.Router()


route.get('/', gethomepage)

route.get('/start', getstartpage)

route.get('/exit', getexitpage)

route.get('/token', gettokenpage)


route.get('/attendance', getAttendance)

route.post('/create',createpage )
route.post("/exitpage",Exitpage)


module.exports = route

