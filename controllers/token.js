const config = require('../config')
const jwt = require('jsonwebtoken');

module.exports = {

        generateAccessToken:function (payload)  {
          
                return jwt.sign(payload ,config.tokenSettings.privateKey, { expiresIn:  config.tokenSettings.accessTokenExpiry  } )
        } , 
        generateRefreshToken :function (payload)  {
                return jwt.sign(payload , config.tokenSettings.privateKey, { expiresIn:  config.tokenSettings.refreshTokenExpiry} )
        }    
} 
