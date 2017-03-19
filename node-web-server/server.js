const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express(),
    maintenanceNode = false;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middlewares start

app.use((req, res, next) => {
    var now = new Date().toString(),
        log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log(error);
        }
    });
    next();
});

app.use((req, res, next) => {
    if (maintenanceNode) {
        res.render('maintenance');
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/public')); // <--- This is actually a middleware.

// Middlewares end

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home page',
        welcomeMessage: 'Hola bueno tere!'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Ooops....'
    });
});

app.get('/json-response', (req, res) => {
    res.send({
        data: 'content',
        message: 'returning json here'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running');
});
