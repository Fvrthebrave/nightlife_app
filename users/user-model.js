var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        // This will be a list of bars the user is involved in.
        includedIn: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Bar'
                }
        ]
    }
);

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);