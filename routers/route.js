const express = require('express')
const { gethomepage, getstartpage, getexitpage, gettokenpage, getadminpage, createpage,  createIncrement, Exitpage, Entrypage, } = require('../controllers/control')
const { create } = require('../models/model')

const route = express.Router()


route.get('/', gethomepage)

route.get('/start', getstartpage)

route.get('/exit', getexitpage)

route.get('/token', gettokenpage)


route.get('/admin', getadminpage)

route.post('/create',createpage )
route.post("/increment",createIncrement)
route.post("/exitpage",Exitpage)
route.post('/entry',Entrypage)


module.exports = route

