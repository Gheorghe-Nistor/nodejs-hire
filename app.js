const e = require('express');
const express = require('express');

const app = express();

app.listen(3000);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {title: 'Home', cssFile: 'home.css'});
});

app.get('/post', (req, res) => {
    res.render('post', {title: 'Post', cssFile: 'post.css'});
});