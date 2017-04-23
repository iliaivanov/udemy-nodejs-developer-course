const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const dummy = [{
    _id: new ObjectID(),
    text: 'First dummy todo'
}, {
    _id: new ObjectID(),
    text: 'Second dummy todo',
    complited: true,
    complitedAt: 123
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummy);
    })
    .then(() => {
        return User.remove({});
    })
    .then(() => done()); // Wipe all Todos and add dummy data

});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'here is a test note';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with an invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => {
                    done(err);
                });

            });
    });

    it('should all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(dummy.length);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
     it('should return todo doc', (done) => {
         request(app)
            .get(`/todos/${dummy[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(dummy[0].text);
            })
            .end(done);
     });

     it('should return a 404 if todo not found', (done) => {
         let hexId = new ObjectID().toHexString();

         request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
     });

     it('should return a 404 for non-object ids', (done) => {
         request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
     });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = dummy[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });

    it('should return a 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if id is invalid', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
        let id = dummy[0]._id.toHexString(),
            text = "I'm the different now";

        request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                complited: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.complited).toBe(true);
                expect(res.body.todo.complitedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear complitedAt when todo is not complited', (done) => {
        let id = dummy[1]._id.toHexString(),
            text = "I'm the different now too";

        request(app)
            .patch(`/todos/${id}`)
            .send({
                text,
                comlited: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.complited).toBe(false);
                expect(res.body.todo.complitedAt).toNotExist();
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();

        request(app)
            .patch(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if id is invalid', (done) => {
        request(app)
            .patch('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create user', (done) => {
        let email = 'ilya.pskov@gmail.com';

        request(app)
            .post('/users')
            .send({
                email,
                password: 'mysecurepass'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(email);
            })
            .end(done);
    });

    it('should return 400 if email already exists', (done) => {
        let email = 'ilya.pskov@gmail.com';

        request(app)
            .post('/users')
            .send({
                email,
                password: 'mysecurepass'
            })
            .end(() => {
                request(app)
                    .post('/users')
                    .send({
                        email,
                        password: 'mysecurepass'
                    })
                    .expect(400)
                    .end(done);
            });
    });

    it('should return 400 if no email passed', (done) => {
        request(app)
            .post('/users')
            .send({password: 'mysecurepass'})
            .expect(400)
            .end(done);
    });

    it('should return 400 if no password passed', (done) => {
        request(app)
            .post('/users')
            .send({email: 'ilya.pskov@gmail.com'})
            .expect(400)
            .end(done);
    });

    it('should return 400 if email is invalid', (done) => {
        request(app)
            .post('/users')
            .send({
                password: 'mysecurepass',
                email: 'invalidemail'
            })
            .expect(400)
            .end(done);
    });

    it('should return 400 if password is too short', (done) => {
        request(app)
            .post('/users')
            .send({
                password: 'O',
                email: 'ilya.pskov@gmail.com'
            })
            .expect(400)
            .end(done);
    });
});
