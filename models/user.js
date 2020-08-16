var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on("open", function(ref) {
    console.log("\n\n\nConnected to mongo server.\n\n\n");
    console.log(mongoose.connection.readyState);
});
var db = mongoose.connection;
db.on('connected', function() {
    console.log("\n\n\nConnected to mongo db.\n\n\n");
});
mongoose.connection.on("error", function(err) {
    console.log('\n\n\n\n\n');
    console.log("Could not connect to mongo server!");
    console.log(err.message);
    console.log('\n\n\n\n\n');
    console.log(err);
    return console.log('\n\n\n\n\n');
});
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
    profileimage: {
        type: String
    }
});
var User = module.exports = mongoose.model('User', UserSchema);
module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
}