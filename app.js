const express = require("express");
const connectdb = require("./utils/db");
const UserModel = require("./models/userModel");
const app = express();


app.post("/signup" , async (req , res) =>{
try {
        const dummyuser = {
        firstName:"vansh",
        lastName:"chouksey",
        emailId:"vansh@gmail.com",
        password:"1234567",
        mobileNumber:"12345678"
    }

    const user  = new UserModel(dummyuser);
    await user.save();
    res.status(200).send("useer added succesfullly");
} catch (error) {
    console.error("went wrong");
    res.status(400).send("error" , error.message)
    
}
})

// wildcard error handling

app.use("/" , (err , req , res, next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})

connectdb().then(()=>{
    console.log("db connected sucessfuly");
    app.listen(3000, ()=>{
    console.log("app is running");
    
})
    
}).catch(()=>{
    console.error("connection failed");
    
    
})
