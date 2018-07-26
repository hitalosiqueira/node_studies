const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, users, populateTodos, populateUsers} = require('./seed/seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
    it('should create a todo', (done) => {
        var text = 'test todo text';

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
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should not create a todo', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                });
            }
        )
    });
});

describe('GET /todos', () => {
    it('should return all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.docs.length).toBe(2);
                expect(res.body.docs[0].text).toBe(todos[0].text);
                expect(res.body.docs[1].text).toBe(todos[1].text);
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    expect(todos[0].text).toBe(todos[0].text);
                    expect(todos[1].text).toBe(todos[1].text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});

describe('GET /todos/:id', () => {
    it('should return todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/5b57c58c7121544f7d242978`)
            .expect(404)
            .end(done);
    });

    it('should return 400 if id is invalid', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /todos/:id', () =>{
    it('should delete a todo', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/5b57c58c7121544f7d242978`)
            .expect(404)
            .end(done);
    });

    it('should return 400 if id is invalid', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(400)
            .end(done);
    });
});

describe('PATCH /todo/:id', () => {
    it('should update the todo', (done) => {
        var body = {
            text: 'lalalala',
            completed: true
        }

        request(app)
            .patch(`/todos/${todos[0]._id}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(body.text);
                expect(res.body.doc.completed).toBe(body.completed);
                expect(res.body.doc.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var body = {
            completed: false,
            text: 'lulululu'
        }

        request(app)
            .patch(`/todos/${todos[1]._id}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(body.text);
                expect(res.body.doc.completed).toBe(body.completed);
                expect(res.body.doc.completedAt).toNotExist();
            })
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return the user if athentication is ok', (done) => {
        request(app)
            .get('/users/me')
            .set('Authorization', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if user is not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var user = {
            email: "lalala@hotmail.com",
            password: "abbba123"
        }

        request(app)
            .post('/users')
            .send(user)
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(user.email).toBeA("string");
            })
            .end(done)
    });

    it('should return 400 if request is invalid', (done) => {
        var user = {
            email: "lalalmail.com",
            password: "abbba123"
        }
        request(app)
            .post('/users')
            .send(user)
            .expect(400)
            .end(done)
    });

    it('should not create a user if email is in use', (done) => {
        var user = {
            email: "hsiqueira@gmail.com",
            password: "abbba123"
        }

        request(app)
            .post('/users')
            .send(user)
            .expect(400)
            .end(done)
    });
});

