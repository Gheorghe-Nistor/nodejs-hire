const { response } = require('express');
const express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const { nextTick } = require('process');

// express app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var data = [], index = 0;

fs.readFile('data/jobs.json', 'utf-8', (err, jsonString) => {
    if(err)
        console.log(err);
    else {
        try{
            let old_data = JSON.parse(jsonString);
            Object.values(old_data).forEach(element => {
                data[index++] = element;
            });
        }
        catch(err){
            console.log('Error parsing JSON', err);
        }
    }
})

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static(__dirname + '/public'));

app.use('/apply', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', {title: 'Home', cssFile: 'home.css'});
});

app.get('/post', (req, res) => {
    res.render('post', {title: 'Post', cssFile: 'post.css'});
});
app.post('/post', (req, res) => {
    data[index++] = req.body;
    data[index-1].id = index-1;
    fs.writeFileSync('data/jobs.json', JSON.stringify(data, null, 2));
    res.redirect(`/apply/${index-1}`);
});
app.get('/jobs', (req, res) => {
    console.log(data);
    res.render('jobs', {title: 'Jobs', cssFile: 'jobs.css', data});
});
app.get('/apply/:id', (req, res, next) => {
    const id = req.params.id;
    if(id in data)
        res.render('apply', {title: 'Apply', cssFile:'apply.css', data:data[id]});
    else
        next();
});
app.use((req, res) => {
    res.status(404).render('404', { title: '404', cssFile: '404.css'});
})