const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

class Database{
    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect(process.env.DATABASE)
        .then(()=>{console.log('Database is connected,successfuly!!!')})
        .catch((err)=>{
            console.log("database connection error " + err);
        })
    }
}

module.exports=new Database();