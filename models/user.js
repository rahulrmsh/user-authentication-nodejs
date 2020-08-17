var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

const connectToMongoDB = () => {
    const opts = {
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        socketTimeoutMS: 30000,
        poolSize: 50,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        autoReconnect: true,
    };

    return mongoose.connect('mongodb://user:password@mongodb:27017/nodeauth', opts);
};

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

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
            console.log('Success')
        });
    });
}