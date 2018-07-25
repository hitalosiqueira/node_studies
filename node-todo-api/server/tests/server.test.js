const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectId(),
    text: 'First test todo'
}, {
    _id: new ObjectId(),
    text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
       Todo.insertMany(todos);
    })
    .then(() => {
        done();
    });
});

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