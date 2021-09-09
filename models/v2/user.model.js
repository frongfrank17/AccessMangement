const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user_id :   {type : String ,   index : true ,  required : true } , 
    username :   {type : String ,   index : true ,  required : true } ,
    password : {type : String } ,  
    firstname : {type : String} ,
    lastname : {type : String} ,
})
module.exports = mongoose.model('accounts', UserSchema)
