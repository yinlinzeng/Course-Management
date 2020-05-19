const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

const port = 3000

app.get('/',(req,res)=> res.send('hello world'))

app.listen(port,()=>console.log(`example app is linstening port ${port}!`))