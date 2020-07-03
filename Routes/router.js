
'use strict'

const express = require('express')
const controller = require('../controller/controll')

const router = express.Router()

const multiparty = require('connect-multiparty')
var md_upload = multiparty({uploadDir: './upload/articles'})

//Metodos POST
router.post('/addArticle', controller.article)
router.post('/upload-img/:id',md_upload ,controller.upload)

//Metodos GET
router.get('/article/:id', controller.articleId)
router.get('/get-image/:image', controller.getImage)
router.get('/articles', controller.articles)

//Metodos UPDATE
router.put('/articleUpdate/:id', controller.UpdateArticle)

//Metodos DELETE
router.delete('/articleDelete/:id', controller.DeleteArticle)


module.exports = router
