const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123
}];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
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
    password: 'lalalelele'
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