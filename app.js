
'use strict'

const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')
const router = require('./Routes/router')

const app = express()
app.use(cors())

app.use(bodyParse.urlencoded({extended: false}))
app.use(bodyParse.json())

// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


app.use('/api', router)

module.exports = app

