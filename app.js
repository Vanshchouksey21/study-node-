const express = require("express");
const connectdb = require("./utils/db");
const UserModel = require("./models/userModel");
const app = express();
const bycrypt = require("bcrypt")

app.use(express.json());

// signup
app.post("/signup" , async (req , res) =>{
try{ 
    const {firstName , lastName , emailId , password , mobileNumber} = req.body
    const hashpassword =  await bycrypt.hash(password , 10)
    const user  = new UserModel({
        firstName , lastName , emailId , password:hashpassword , mobileNumber
    });
    await user.save();
    res.status(200).send("useer added succesfullly");
} catch (error) {
    console.error(error.message);
    res.status(400).send(error.message)
    
}
})

// login
app.post("/login" , async(req , res) =>{
    const {emailId ,  password} = req.body ;
    try {
        const userdata = await UserModel.findOne({emailId});
        if(!userdata){
           return res.status(400).send("invalid creds")
        };
        const validatepassword = await bycrypt.compare(password , userdata.password);
        
        if(!validatepassword){
            return res.status(400).send("invalid creds");
        }
        res.status(200).send("login succesfully")
        

        
    } catch (error) {
        console.error(error.message);
        res.status(404).send(error.message)
        
    }
})

//get data
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
        const updateduser = await UserModel.findByIdAndUpdate({_id:userId} , {updatedDeatils:updatedDeatils} , {runValidators:true});
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
