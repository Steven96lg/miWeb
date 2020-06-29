
'use strict'

const mongoose = require('mongoose')

const app = require('./app')
const port = 4000

mongoose.connect('mongodb://localhost:27017/mi_api_web', {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Conectado a MongoDB'))
.catch(() => console.log('Error en la Conexion'))

app.listen(port, () => console.log('Escuchando en el Puerto', port))

