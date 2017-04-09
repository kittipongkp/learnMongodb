var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {type: String, 
        unique: true, 
        trim: true, 
        required: true},
    email: {type: String, 
        index: true,
        match: /.+\@.+\.+/ },
    password:{
        type:String,
        validate:[
            function(password){
                return password && password.length >= 6;
            },'Password must be leat 6 characters'
        ]
         },
    create:{
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['Admin','Owner','User']
    }
});

mongoose.model('User',UserSchema);