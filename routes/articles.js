const express = require('express')
const Article = require('../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new', {title: "new Article", article: new Article()})
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { title: "Edit Article", article: article })
})


router.get('/:slug', async (req, res) => {
    const article = await Article.findOne( { slug: req.params.slug } )
    if(article == null) res.redirect('/')
    res.render('articles/show', {title: `article ${article.title}`, article: article })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    console.log(`Article ${req.params.id} deleted`)
    res.redirect('/')
})

module.exports = router