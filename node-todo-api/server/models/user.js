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
    var access = 'authorization';
    var token = jwt.sign({_id: this._id, access}, process.env.JWT_SECRET);

    this.tokens.push({access, token});

    return this.save().then(() => {
        return token;
    });
}

function findByCredentials(email, password) {
    return this.findOne({email}).then((user) => {
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve, reject)=> {
            bcrypt.compare(password, user.password, (err, res)=> {
                if(res){
                    resolve(user);
                }else{
                    reject();
                }
            });
        });
    });
}

function toJSON() {

    return _.pick(this.toObject(), ['_id', 'email']);
}

function findByToken(token) {
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return this.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'authorization'
    });
}

function removeToken(token){
    return this.update({
        $pull: {
            tokens: {token}
        }
    });
}

UserSchema.methods = {
    generateAuthToken,
    toJSON,
    removeToken
}

UserSchema.statics = {
    findByToken,
    findByCredentials
}

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};