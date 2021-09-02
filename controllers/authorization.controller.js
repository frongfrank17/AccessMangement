const User = require('../models/user.model')
const { Rigth_permission , Rigth_role } =require('./role_rigth')
module.exports = {
    History : async (req , res ) => {
        try {
             let { username , user_id } =   req.jwtDecode
            let  CheckRightPermission = await Rigth_permission(user_id , 'history')
            let  CheckRightRole = await Rigth_role(user_id , 'history')
            if( CheckRightRole ==true ||  CheckRightPermission == true) {
                res.status(200).send({message : 'History Page'} )
            } else {
                return res.status(401).send({ message : "Not Rigth Role And permission" })
            } 
        } 
        catch(err) {
            console.log({message : err.message}) 
            console.log({stack : err.stack}) 
            res.status(500).send({message : err.message})
        } 
     } ,
     Realtime : async (req , res ) => {
        try {
            let { username , user_id } =   req.jwtDecode
            let  CheckRightPermission =  false //await Rigth_permission(user_id , 'realtime')
            let  CheckRightRole =await Rigth_role(user_id , 'realtime')
            console.log(CheckRightPermission)
            if( CheckRightRole == true ||  CheckRightPermission == true) {
                res.status(200).send({message : 'Realtime Page'} )
            } else {
                return res.status(401).send({ message : "Not Rigth Role And permission" })
            } 
        } 
        catch(err) {
            console.log({message : err.message}) 
            console.log({stack : err.stack}) 
            res.status(500).send({message : err.message})
        } 
     }
} 