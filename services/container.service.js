const request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'
const serviceUrl = (process.env.SERVICE_CONTAINER || 'http://10.224.187.41:3003');
module.exports.checkIfMember = (payload) => {
   return new Promise((resolve, reject) => {

        const opts = { gzip:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: (serviceUrl) + '/containers/'+payload.owner + '/'+payload.container+'/members/check/' + payload.username,
            method: 'GET',
            json: true
        }
        
        request(opts, function(error, response, body) {
            if (error){ reject(error) }
            else if (response.statusCode == 200) resolve(body)
            else reject(body)
        })
   })
}