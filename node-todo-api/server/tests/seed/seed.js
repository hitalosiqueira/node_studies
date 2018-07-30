const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123,
    _creator: userTwoId
}];

const users = [{
    _id: userOneId,
    email: 'hsiqueira@gmail.com',
    password: 'abc1234',
    tokens: [{
       access: 'authorization',
       token: jwt.sign({_id: userOneId, access: 'authorization'}, 'abc123')
    }]
},{
    _id: userTwoId,
    email: 'lalala@gmail.com',
    password: 'lalalelele',
    tokens: [{
        access: 'authorization',
        token: jwt.sign({_id: userTwoId, access: 'authorization'}, 'abc123')
     }]
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
       Todo.insertMany(todos);
    })
    .then(() => {
        done();
    });
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var UserOne = new User(users[0]).save();
        var UserTwo = new User(users[1]).save();

        return Promise.all([UserOne, UserTwo]);
    }).then(() => {
        done();
    });
}

module.exports = {
    todos,
    populateTodos,
    populateUsers,
    users
}