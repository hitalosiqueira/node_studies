const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text:{
        type: String,
        required: true,
        trim: true,
        minlegnth: 1

    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = {
    Todo
};