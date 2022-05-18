const { response } = require('express');
const express = require('express');
const session = require('express-session');
const store = new session.MemoryStore();
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();
const fileupload = require("express-fileupload");
const { nextTick, env } = require('process');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    secure: true,
});

// express app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(fileupload());

var data = [], index = 0;

fs.readFile('data/jobs.json', 'utf-8', (err, jsonString) => {
    if(err)
        console.log('Error occur');
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

app.use(session({
    secret: process.env.SESSION,
    cookie: {maxAge: 300000},
    saveUninitialized: false,
    resave: true,
    store
}));

app.use(function(req, res, next) {
    if(req.session.authenticated == undefined)
        res.locals.authenticated = false;
    else
        res.locals.authenticated = req.session.authenticated;
    next();
});

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
app.get('/home', (req, res) => {
    res.redirect('/');
})
app.get('/login', (req, res) => {
    if(req.session.authenticated){
        req.session.destroy();
        res.redirect('/');
    } else{
        res.render('login', {title: 'Login', message: "", cssFile: 'login.css'});
    }
})
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(username==process.env.ADMIN_USERNAME && password==process.env.ADMIN_PASSWORD){
        req.session.authenticated = true;
        req.session.user = {username, password};
        res.redirect('/');
    } else {
        res.render('login', {title: 'Login', message: "Authentication failed!", cssFile: 'login.css'})
    }
});
app.get('/post', (req, res) => {
    res.render('post', {title: 'Post', cssFile: 'post.css'});
});
app.post('/post', (req, res) => {
    data[index] = req.body;
    data[index].date = new Date(Date.now()).toLocaleString().split(',')[0];
    data[index].id = index;
    index++;
    fs.writeFileSync('data/jobs.json', JSON.stringify(data, null, 2));
    res.redirect(`/apply/${index-1}`);
});
app.get('/jobs', (req, res) => {
    res.render('jobs', {title: 'Jobs', cssFile: 'jobs.css', data});
});
app.get('/apply/:id', (req, res, next) => {
    const id = req.params.id;
    if(id in data)
        res.render('apply', {title: 'Apply', cssFile:'apply.css', data:data[id]});
    else
        next();
});
app.post('/apply', (req, res) => {
    let id = req.body.job_id;
    let mailOptions = {
        from: 'nistorgeorge666@gmail.com',
        to: data[id].email,
        subject: `${data[id].title}: ${req.body.first_name} ${req.body.last_name}`,
        attachments:[
            {
                filename: req.files.cv.name,
                path: req.files.cv.path
            }
        ],
        text:
        `-----> Job information <-----
Title: ${data[id].title}
Description: ${data[id].description}
Category: ${data[id].category}
Experience: ${data[id].experience}
Type: ${data[id].type}

-----> Employee information <-----
First name:  ${req.body.first_name}
Last name: ${req.body.last_name}
Sex: ${req.body.sex}
Birth date: ${req.body.birth_date}
Phone number: ${req.body.phone_number}
Email: ${req.body.email}`
    };
    transporter.sendMail(mailOptions, function(err, data){
        if(err)
            console.log(err);
    });
    res.redirect('/');
})
app.use((req, res) => {
    res.status(404).render('404', { title: '404', cssFile: '404.css'});
})