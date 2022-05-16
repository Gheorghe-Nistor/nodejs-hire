const e = require('express');
const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {title: 'Home', cssFile: 'home.css'});
});

app.get('/post', (req, res) => {
    res.render('post', {title: 'Post', cssFile: 'post.css'});
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404', cssFile: '404.css'});
})