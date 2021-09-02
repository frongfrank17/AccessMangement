const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
    user_id :   {type : String ,   index : true ,  required : true } , 
    scopes : {type : Array , default : []} , 
    roles : {type : Array , default : []} , 
    created_by : {type : String ,   required : true  } ,  
    updated_by : {type : String ,  required : true } ,  
} , {timestamps :  {  createdAt: 'created_at' , updatedAt : 'updated_at' } } )
module.exports = mongoose.model('permissions', PermissionSchema)
