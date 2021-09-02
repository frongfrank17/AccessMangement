const mongoose = require('mongoose')

const rigthSchema = new mongoose.Schema({
    rigth_id :   {type : String ,   index : true ,  required : true } , 
    user_id :   {type : String ,   index : true ,  required : true } , 
    roles : {type : Array} , 
    permission : {type : String}   

})
module.exports = mongoose.model('rigths', UserSchema)
