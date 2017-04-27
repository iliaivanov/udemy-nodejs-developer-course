const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {dummy, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'here is a test note';

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
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
            .set('x-auth', users[0].tokens[0].token)
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
});

describe('GET /todos', () => {
    it('should return todos', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
     it('should return todo doc', (done) => {
         request(app)
            .get(`/todos/${dummy[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(dummy[0].text);
            })
            .end(done);
     });

     it('should not return todo doc created by other user', (done) => {
         request(app)
            .get(`/todos/${dummy[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
     });

     it('should return a 404 if todo not found', (done) => {
         let hexId = new ObjectID().toHexString();

         request(app)
            .get(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token) // doesn't matter what token is used
            .expect(404)
            .end(done);
     });

     it('should return a 404 for non-object ids', (done) => {
         request(app)
            .get('/todos/123')
            .set('x-auth', users[0].tokens[0].token) // doesn't matter what token is used
            .expect(404)
            .end(done);
     });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = dummy[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
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
    
    it('should not remove todo of another user', (done) => {
        let hexId = dummy[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toExist();
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should return a 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if id is invalid', (done) => {
        request(app)
            .delete('/todos/123')
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update todo', (done) => {
        let id = dummy[0]._id.toHexString(),
            text = "I'm the different now";

        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
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

    it('should not update todo created by other user', (done) => {
        let id = dummy[1]._id.toHexString(),
            text = "I'm the different now";

        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                text,
                complited: true
            })
            .expect(404)
            .end(done);
    });

    it('should clear complitedAt when todo is not complited', (done) => {
        let id = dummy[1]._id.toHexString(),
            text = "I'm the different now too";

        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[1].tokens[0].token)
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
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if id is invalid', (done) => {
        request(app)
            .patch('/todos/123')
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create user', (done) => {
        let email = 'ilya.pskov@gmail.com';
        let password = 'mysecurepass';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should return 400 if email already exists', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email,
                password: users[0].password
            })
            .expect(400)
            .end(done);

        // This was made before seeders for users.
        // let email = 'ilya.pskov@gmail.com';
        //
        // request(app)
        //     .post('/users')
        //     .send({
        //         email,
        //         password: 'mysecurepass'
        //     })
        //     .end(() => {
        //         request(app)
        //             .post('/users')
        //             .send({
        //                 email,
        //                 password: 'mysecurepass'
        //             })
        //             .expect(400)
        //             .end(done);
        //     });
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

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password + 'invalid pass'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(1);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
        let token = users[0].tokens[0].token;

        request(app)
            .delete('/users/me/token')
            .set('x-auth', token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });
});
