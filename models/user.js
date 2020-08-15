var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;

var UserSchema = mongoose.Schema({
    inputUsername: {
        type: String,
        index: true
    },
    inputName: {
        type: String
    },
    inputEmail: {
        type: String
    },
    inputPassword: {
        type: String
    },
    inputCheckPassword: {
        type: String
    },
    profileimage: {
        type: String
    }
});
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
}