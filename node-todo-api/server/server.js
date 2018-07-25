const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const mongoose = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos', (req, res) => {
    Todo.find().then((docs) => {
        res.send({docs});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)){
        return res.status(400).send();
    }

    Todo.findById(id).then((doc) => {
        
        if(!doc){
            return res.status(404).send();
        }

        res.send({doc});
    }).catch((err) => {
        res.status(400).send();
    });

});

app.listen(3000, () => {
    console.log("server started on port 3000");
});

module.exports = {
    app
};