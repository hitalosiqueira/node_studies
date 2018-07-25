const {User} = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('Authorization');

    User.findByToken(token).then((user) => {

        if(!user){
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch(e => {
        res.status(401).send({
            message: 'User not authorized'
        });
    });
}

module.exports = {
    authenticate
}