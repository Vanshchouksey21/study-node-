const mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName :{
        type:String
    },
        lastName :{
        type:String
    },
        emailId :{
        type:String
    },
        password :{
        type:String
    },
    mobileNumber :{
        type:Number
    },
});

const UserModel = mongoose.model("user" , UserSchema);


module.exports = UserModel ;