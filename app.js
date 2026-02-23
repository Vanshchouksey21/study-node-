console.log("hello ")


const express = require("express");
const app = express();

app.get("/" , (req , res , next)=>{
    console.log("path 1 ");
    
   next();
},
(req , res)=>{
console.log("path 2 ");

res.send("r2")
})

app.listen( 3000 , ()=>{
    console.log("app is running");
    
})