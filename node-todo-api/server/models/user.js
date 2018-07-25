const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

function generateAuthToken() {
    var access = 'auth';
    var token = jwt.sign({_id: this._id, access}, 'abc123');

    this.tokens.push({access, token});

    return this.save().then(() => {
        return token;
    });
}

function toJSON() {

    return _.pick(this.toObject(), ['_id', 'email']);
}

UserSchema.methods = {
    generateAuthToken,
    toJSON
}

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};