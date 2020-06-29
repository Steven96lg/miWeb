
'use strict'

const express = require('express')
const controller = require('../controller/controll')

const router = express.Router()

//Metodos POST
router.post('/addArticle', controller.article)

//Metodos GET
router.get('/article/:id', controller.articleId)
router.get('/articles', controller.articles)

//Metodos UPDATE
router.put('/articleUpdate/:id', controller.UpdateArticle)

//Metodos DELETE
router.delete('/articleDelete/:id', controller.DeleteArticle)


module.exports = router
