
const Permission = require('../models/permission.model')

const Permission_ = require('../models/permission_.model')
const Roles = require('../models/role.model')
const UserPermission = require('../models/userPermission.model')
const UIDGenerator = require('uid-generator');
module.exports = {

    assignRoletoUser : async (req , res ) => {
            
        try {
            let  { user_id ,role } =req.body
            let { username } =req.jwtDecode
                
            if(user_id  && role  ) {
                let update = await Permission.updateOne({ user_id : user_id} , 
                   {$push : { roles : role } }  
                    )
      
                   
                return   res.status(200).json(  update  )
            }  else {
                return res.status(400).send({ message : 'Invalid '} )
            } 

        } catch(err) {
            console.log(err.message) 
            console.log(err.stack)
            res.status(500).send(err.message) 
        } 

    } ,
    getPermissionById : async (req ,res) => {
        try{
            let { username , user_id } =   req.jwtDecode
            // let scope = await Permission.findOne({user_id : user_id} , { _id : 0 , roles: 1 , scopes :1 } ).exec()
            let scope = await UserPermission.find({user_id : user_id} , {_id: 0, 'page': '$name', 'view': 1, 'action': 1} ).exec()
            console.log(scope)
            // let roles = await Roles.aggregate([
            //     {
            //         $match : {
            //             role_id : {$in : scope['roles'] } 
            //         } 
            //     } , 
            //     {
            //         $project : { 
            //             _id: 0 ,
            //             role_id : 1 , 
            //             role_name : 1 , 
            //             'scopes' :1
            //         } 
            //     }
            
                
            // ]).exec()
            // console.log(roles)
            if(scope) {
                return res.status(200).json({
                        message : "scope in role " , 
                        data : scope
                    } 
                )
            } else {
                return res.status(400).send({ message : 'Invalid '} )
            } 

        }catch(err) {
                console.log(err.message) 
                console.log(err.stack)
                res.status(500).send(err.message) 
        }  
    }  , 
    addScopeToPermission : async ( req ,res) => {
        try {
            let  { scopes ,user_id } = req.body
            let { username } =req.jwtDecode
            if(user_id && scopes) {
                
               await Permission.updateOne( { user_id  : user_id } , {$push : { scopes : scopes } } ).then( async  doc => {

                       await Permission.updateOne( { user_id  : user_id } , { $set : { updated_by : username } } )

                        return res.status(200).send({ message : 'update Scope to Permission success'} )

                } ).catch(err => {

                    return res.status(400).send({ message : err} )

                }  )

            }else {

                return res.status(400).send({ message : 'bad request'} )
            }

        }catch (err) {
            console.log(err.message) 
            console.log(err.stack)
            res.status(500).send(err.message) 
        } 
    }  ,
    getPermission_ : async (req , res) => { 
        try {
            let { username } =req.jwtDecode
            let result = await Permission_.findOne({  username:username })
            res.status(200).json(result)
        } catch( err) {
            console.log(err.message) 
             console.log(err.stack) 
             res.status(500).json({message : err.message})
        }
    }

} 