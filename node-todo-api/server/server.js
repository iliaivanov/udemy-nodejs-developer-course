let express = require('express'),
    bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose'),
    {User} = require('./models/user'),
    {Todo} = require('./models/todo');

let app = express();

app.use(bodyParser.json()); // Middleware.

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});
