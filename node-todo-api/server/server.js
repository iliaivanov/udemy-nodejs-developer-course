let express = require('express'),
    bodyParser = require('body-parser'),
    {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose'),
    {User} = require('./models/user'),
    {Todo} = require('./models/todo');

let app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware.

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (todo === null) {
            res.status(404).send();
        }

        res.send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

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

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo === null) {
            res.status(404).send();
        }

        res.send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
