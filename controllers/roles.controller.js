const Roles = require('../models/role.model')
const Permission = require('../models/permission.model')
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();
module.exports = {
    create : async (req ,res ) => {

            try {
                let  { scope , role_name  } =req.body
                let { username } = req.jwtDecode 
                if( scope && role_name )  {
                            let payload = {
                                owner : username ,
                                scopes : scope ,
                                role_id : await uidgen.generate() , 
                                role_name : role_name  ,
                                created_by : username 
                                
                            } 
                            let create = await Roles.create(payload).catch(err => {
                                return res.status(400).send({ message : err} )
                            } )
                            console.log(create) 
                            res.status(200).send("create role successs")

                } else {
                    return res.status(400).send({ message : 'Invalid '} )
                } 


            } catch(err) {
                console.log(err.message) 
                console.log(err.stack)
                res.status(500).send(err.message) 
            } 

    } ,
    updateRoleScope : async (req , res) => {
        try{
            
            let  { role_id ,scope } =req.body
            let { username } =req.jwtDecode
            if(role_id , scope) {
                let updated = await Roles.updateOne({role_id : role_id} , {$push : { scopes : scope } } )
                await Roles.updateOne({role_id : role_id} , {$set : { updated_at : username }  } )
                return res.status(200).json( {message : "update role success"} )
            }else {
                return res.status(400).send({ message : 'Invalid '} )
            }   

        } catch(err) {
            console.log(err.message) 
            console.log(err.stack)
            res.status(500).send(err.message) 
        } 

    } 

} 