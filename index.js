const express = require('express');
const blogs = require('./data/blogs');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/blogs', (req, res) => {
    res.render('bloghome', {
        blogs: blogs
    })
});

app.get('/blogpost/:slug', (req, res) => {
    myBlog = blogs.filter((e) => {
        return e.slug == req.params.slug
    })
    res.render('blogPage', {
        title: myBlog[0].title,
        content: myBlog[0].content,
        trainer: myBlog[0].trainer,
        slug: myBlog[0].slug
    })
});

app.listen(port, () => {
    console.log(`Blog app listening on port at http://localhost:${port}`)
});