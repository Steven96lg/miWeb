
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Articles = new Schema({
    title: String,
    description: String,
    content: String, 
    author: String,
    image: String,
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Article', Articles)