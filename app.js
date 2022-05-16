const express = require('express');
const fs = require('fs');

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

app.get('/apply', (req, res) => {
    res.render('apply', {title: 'Apply', cssFile: 'apply.css'});
    fs.readFile('database/jobs.json', 'utf-8', (err, jsonString) => {
        if(err)
            console.log(err);
        else {
            try{
                const data = JSON.parse(jsonString);
                console.log(data.name);
            }
            catch(err){
                console.log('Error parsing JSON', err);
            }
        }
    })
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404', cssFile: '404.css'});
})