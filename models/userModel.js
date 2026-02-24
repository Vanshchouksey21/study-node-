const mongoose  = require("mongoose");
const validator = require("validator")

const UserSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true
    },
        lastName :{
        type:String
    },
        emailId :{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address :" + value)
            }
        }
        
    },
        password :{
        type:String,
        required:true,
                validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("invalid Enter a strong password :" + value)
            }
        }
        
    },
mobileNumber: {
  type: String,
  required: true,
  validate: {
    
    validator: function (value) {
      return /^[0-9]{10}$/.test(value);
      throw new Error("Enter valid 10 digit mobile number")
    },
   
    
  }
}

}
    ,{
        timestamps:true
    });

const UserModel = mongoose.model("user" , UserSchema);


module.exports = UserModel ;