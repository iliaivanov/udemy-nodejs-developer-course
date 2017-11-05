require('./config/config');

const express = require('express'),
    bodyParser = require('body-parser'),
    {ObjectID} = require('mongodb'),
    _ = require('lodash');

let {mongoose} = require('./db/mongoose'),
    {User} = require('./models/user'),
    {Todo} = require('./models/todo'),
    {authenticate} = require('./middleware/authenticate');

let app = express();

const port = process.env.PORT;

app.use(bodyParser.json()); // Middleware.

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (todo === null) {
            return res.status(404).send();
        }

        res.send({todo});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.delete('/todos/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    try {
        const todo = await Todo.findOneAndRemove({ _id: id, _creator: req.user._id })

        if (todo === null) {
            return res.status(404).send();
        }

        res.send({ todo });
    } catch (error) {
        res.status(400).send(error.message);
    };
});

app.patch('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id,
        body = _.pick(req.body, ['text', 'complited']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.complited) && body.complited === true) {
        body.complitedAt = new Date().getTime();
    } else {
        body.complitedAt = null;
        body.complited = false;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if (todo === null) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post('/users', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);

        await user.save();
        const token = await user.generateAuthToken();

        // 'x-' prefix means the custom header.
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send(error);
    };
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send();
    };
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        const result = await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    };
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
