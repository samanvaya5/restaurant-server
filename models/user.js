const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passsportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname:{
        type:String,
        default:""
    },
    lastname:{
        type:String,
        default:""
    },
    admin:{
        type:Boolean,
        default:false,
    }
});
User.plugin(passsportLocalMongoose);
var Users = mongoose.model('User',User);
module.exports = Users;