const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:String,
    name:String,
    passwordHash:String,
    createdAt: {
        type:Date,
        default:Date.now
    },
    updatedAt:Date,
});



const User = mongoose.model('User',userSchema,'users');



module.exports = User;
