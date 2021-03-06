const { MongoClient } = require('mongodb');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const opts = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    socketTimeoutMS: 30000,
    poolSize: 50,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    autoReconnect: true,
    useNewUrlParser: true,
};

var db = mongoose.connect('mongodb://user:password@mongodb:27017/nodeauth&ssl=true', opts, function(err, db) {
    if (err) {
        console.log(err);
        console.log(err.message);
    }
});
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare("candidatePassword", hash, function(err, res) {
        callback(null, isMatch);
    });
}
module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
            console.log('Success')
        });
    });
}