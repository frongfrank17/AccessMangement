const mongoose = require('mongoose')

const userPermissionSchema = new mongoose.Schema({
    rigth_id : { type : String , require :true  } ,
    name :  { type : String , require :true  } , 
    views : [
        {
            name : { type : String } , 
            actions : {type : Array}  
        }
    ] , 
    actions : {type : Array} ,  
    created_by : {type : String ,   required : true  } ,  
    updated_by : {type : String ,  required : true } ,  
} , {timestamps :  {  createdAt: 'created_at' , updatedAt : 'updated_at' } } )
module.exports = mongoose.model('user_permissions', userPermissionSchema)
