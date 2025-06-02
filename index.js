const express = require('express')
const mongoose = require('mongoose')
const connectTomongodb = require('./connection')
const route = require('./routers/route')
const { type } = require('os')
const app = express()

app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs')

app.use(express.static('public'))


app.use('/', route)



app.listen(5000, () => {
    console.log('server is listening port number 5000');

})