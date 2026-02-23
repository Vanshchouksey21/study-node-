const express = require("express");
const connectdb = require("./utils/db");
const UserModel = require("./models/userModel");
const app = express();

app.use(express.json());

// signup
app.post("/signup" , async (req , res) =>{
try{ 

    const user  = new UserModel(req.body);
    await user.save();
    res.status(200).send("useer added succesfullly");
} catch (error) {
    console.error("went wrong");
    res.status(400).send("error" , error.message)
    
}

console.log(req);

})

//login
app.get("/getuser" , async(req , res) =>{
    const userEmail = req.body.emailId ;

try {
        const getuserdetails = await UserModel.findOne({emailId:userEmail})
    console.log(getuserdetails);
    if(getuserdetails.length === 0){
        return res.status(404).send("user not found ");
    }
    res.status(200).send(getuserdetails)
} catch (error) {
    console.error(error.message);
    res.status(400).send("something went wrong")
    
}
    
})


// delete

app.delete("/deleteuser" , async(req ,res) =>{
    const userid = req.body._id;
    try {
        const deleteUser = await UserModel.findByIdAndDelete({_id : userid});
        console.log(deleteUser);
        
        res.send(deleteUser);

    } catch (error) {
        console.error(error.message);
        
    }
})


app.patch("/updateuser" , async(req , res) =>{
    const updatedDeatils = req.body ; 
    console.log(updatedDeatils);
    
    const userId = req.body._id ; 
    try {
        const updateduser = await UserModel.findByIdAndUpdate({_id:userId} , {updatedDeatils});
        console.log(updateduser);
        console.log("user updated sucessfulyy");
        res.status(200).send(updateduser);
        
        
        
    } catch (error) {

       console.error(error.message);
       res.status(400).send("something went wrong")
        
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
