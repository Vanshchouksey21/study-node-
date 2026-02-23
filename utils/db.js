const {connect } = require("mongoose")

const connectdb = async() =>{

await connect("mongodb+srv://vanshchouksey2175_db_user:dXrNP3onySlsCoYY@cluster0.xgzleex.mongodb.net/")
    
}


module.exports = connectdb
