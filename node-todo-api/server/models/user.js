const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.pre('save', function(next){
    if(this.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) =>{
                this.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

function generateAuthToken() {
    var access = 'Authorization';
    var token = jwt.sign({_id: this._id, access}, 'abc123');

    this.tokens.push({access, token});

    return this.save().then(() => {
        return token;
    });
}

function toJSON() {

    return _.pick(this.toObject(), ['_id', 'email']);
}

function findByToken(token) {
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return this.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'Authorization'
    });
}

UserSchema.methods = {
    generateAuthToken,
    toJSON
}

UserSchema.statics = {
    findByToken
}

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};