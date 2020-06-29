
'use strict'

const Articles = require('../models/Articles')

const controller = {

    article: (req, res) => {

        let bodyArticle = req.body

        const article = new Articles()

        article.title = bodyArticle.title
        article.description = bodyArticle.description
        article.content = bodyArticle.content
        article.author = bodyArticle.author
        article.image = null

        article.save((err, proSave) => {

            if(err){
                res.status(500).send({
                    status: 'Error',
                    message: 'Error al Guardar el Articulo'
                })
            }

            res.status(200).send({
                status: 'Success',
                message: proSave
            })
        })
        
    },

    articleId: (req, res) => {

        let id = req.params.id

        Articles.findById(id, (err, Artic) => {

            if(err){
                res.status(500).send({
                    status: 'Error',
                    Article: 'No se Ha encontrado el Articulo'
                })
            }

            res.status(200).send({
                status: 'Success',
                Article: Artic
            })
        })
    },

    articles: (req, res) => {

        Articles.find({}).sort('-_id').exec((err, artticles) => {

            if(err){
                res.status(500).send({
                    status: 'Error',
                    Articles: 'No hay Articulos'
                })
            }

            res.status(200).send({
                status: 'Success',
                Articles: artticles
            })
        })
    },

    UpdateArticle: (req, res) => {

        let id = req.params.id
        let UpdateBody = req.body

        Articles.findByIdAndUpdate(id, UpdateBody, (err, ArticleUpdate) => {
            if(err){
                res.status(500).send({
                    status: 'Error',
                    Article: 'Error Al Actualizar El Articulo'
                })
            }

            res.status(200).send({
                status: 'Success',
                Article: ArticleUpdate
            })
        })
    },

    DeleteArticle: (req, res) => {

        let id = req.params.id

        Articles.findByIdAndDelete(id, (err, articleDelete) => {

            if(err){
                res.send({
                    status: 'Error',
                    Article: 'No se Puedo Eliminar El Articulo'
                })
            }
            res.status(200).send({
                status: 'Success',
                Article: articleDelete
            })
        })
    }
}

module.exports = controller