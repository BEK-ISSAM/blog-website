const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blogdb')

app.set('view engine', 'ejs') // set the templating engine
app.use(express.urlencoded({ extended: false })) //setting up middleware to parse URL-encoded data and make it available in req.body. This is commonly used for processing form submissions in Express.js applications
app.use(methodOverride('_method')) //override the form action method (to be able to patch, put or delete from the db, because a form action processor only provides the ability to post and get)

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {title: "Blog post", articles: articles})
})

app.use('/articles', articleRouter)


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})
