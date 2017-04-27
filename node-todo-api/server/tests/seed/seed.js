const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

let userOneId = new ObjectID();
let userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'dummy.mail@example.com',
    password: 'useronepass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'somesolt').toString()
    }]
}, {
    _id: userTwoId,
    email: 'other.dummy@example.com',
    password: 'usertwopass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, 'somesolt').toString()
    }]
}];

const dummy = [{
    _id: new ObjectID(),
    text: 'First dummy todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second dummy todo',
    complited: true,
    complitedAt: 123,
    _creator: userTwoId
}];

let populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummy);
    }).then(() => done()); // Wipe all Todos and add dummy data

};

let populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {dummy, populateTodos, users, populateUsers};
