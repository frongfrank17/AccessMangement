const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
    username : {type : String } ,
    role : {type : String }  , 
    permissions : {type : Array}  
}  )
module.exports = mongoose.model('permissions_', PermissionSchema)
