const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const dummy = [{
    _id: new ObjectID(),
    text: 'First dummy todo'
}, {
    _id: new ObjectID(),
    text: 'Second dummy todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummy);
    }).then(() => done()); // Wipe all Todos and add dummy data
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
            .get('/todos/${hexId}')
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
