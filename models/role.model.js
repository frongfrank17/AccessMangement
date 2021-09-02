const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
    owner :   {type : String ,   index : true ,  required : true } , 
    scopes :  {type : Array , default : []}  , 
    role_id : {type : String  , required : true } ,
    role_name : {type : String } ,
    scopes : { type :  String }  , 
    created_by : {type : String ,   required : true  } ,  
    updated_by : {type : String , default :'-'} ,  
} , {timestamps :  {  createdAt: 'created_at' , updatedAt : 'updated_at' } } )
module.exports = mongoose.model('roles', RoleSchema)
