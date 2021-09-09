const Permission = require('../models/permission.model')
const Roles = require('../models/role.model')
module.exports = {
    Rigth_role: async (user_id, scope) => {
        try {
            let findPermission = await Permission.aggregate([
                {
                    $match: {
                        user_id: user_id
                    }
                },
                {
                    $project: {
                        _id: 0,
                        roles: 1
                    }
                },
            ]
            ).exec()
            if (findPermission.length > 0) {
                let chk = await Roles.aggregate([
                    {
                        $match: {
                            role_id: { $in: findPermission[0]['roles'] }
                        }
                    },
                    {
                        $project: {
                            'scopes': {
                                $filter: {
                                    input: '$scopes',
                                    as: 's',
                                    cond: { $eq: [scope, '$$s.page'] }
                                }
                            }
                        }
                    }


                ]).exec()
                if (chk.length > 0 && chk[0].scopes.length > 0) {

                    return true

                } else {
                    return false
                }
            } else {
                return false
            }
        } catch (err) {
            console.log(err.message)
            console.log(err.stack)
            return false
        }
    },
    Rigth_permission: async (user_id, page, action) => {
        console.log(user_id)
        console.log(scope)
        // let chk = await Permission.aggregate([
        //     {
        //         $match : {
        //             user_id : user_id
        //         } 
        //     }  ,    

        //     {
        //         $project : {
        //                 _id : 0 , 
        //                 scope :  {
        //                     $filter : {
        //                         input :  '$scopes' , 
        //                         as : 'r' ,
        //                         cond : { $eq : [ scope , '$$r.page' ] } 
        //                     } 
        //                 } 
        //         }
        //     } ,
        // ]).exec()

        let chk = await Permission.aggregate([
            {
                $match: {
                    user_id: user_id,
                    "name": 'page:' + page,
                    "action": action
                }
            }
        ]).exec()

        console.log(chk.length, chk[0].scope.length)
        if (chk.length > 0 && chk[0].scope.length > 0) {
            return true
        } else {
            return false
        }

    },
    whatRole: async (user_id) => {
        const role = await Roles.findOne({'user_id': user_id})
        if (role) {
            return role.name
        } else {
            return null
        }
    }
}