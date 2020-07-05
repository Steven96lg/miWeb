
'use strict'

const Articles = require('../models/Articles')
const fs = require('fs')
const path = require('path')

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
    },

    upload: (req, res) => {

        var file_name = 'imagen no subida'

        if(!req.files){
            res.status(404).send({
                status: 'Error',
                message: file_name
            })
        }

        var namePath = req.files.file0.path
        var fileCut = namePath.split('\\')

        var fileName = fileCut[2]

        var fileType = fileName.split('.')
        var extendFile = fileType[1]

        if(extendFile != 'jpg' && extendFile != 'jpeg' && extendFile != 'png' && extendFile != 'gif'){
            
            fs.unlink(namePath, (err) => {
                res.status(404).send({
                    status: 'Tipo de Archivo no Compatible, por favor suba una Imagen'
                })
            })

           
        }else{
            var id = req.params.id

            Articles.findOneAndUpdate({_id:id}, {image: fileName}, {new: true}, (err, imageUp) => {

                if(err){
                    res.status(404).send({
                        status: 'Error Al subir Imagen al Servidor'
                    })
                }
                res.status(200).send({
                    status: 'Success',
                    message: imageUp
                })
            })
            
        }

    },

    getImage: (req, res) => {
        var file = req.params.image
        var pathFile = './upload/articles/'+file

        fs.exists(pathFile, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(pathFile))
            }else{
                res.status(404).send({
                    status: 'Error',
                    message: 'Imagen No existe'
                })
            }
        })

    }
}

module.exports = controller