const express = require('express');

var app = express();

app.get('/', (req, res) => {
    // res.send('Hello!');
    res.status(404).send({
        error: 'Page not found.',
        name: 'Some name'
    });
});

app.get('/users', (req, res) => {
    res.send([{
        name: 'Oleg',
        age: 22
    }, {
        name: 'Anton',
        age: 72
    }, {
        name: 'Ilia',
        age: 100
    }]);
});

app.listen(3000);

module.exports.app = app;
