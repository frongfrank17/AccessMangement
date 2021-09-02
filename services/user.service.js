const request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'
const serviceUrl = (process.env.SERVICE_USER || 'http://10.224.187.41:3002');
module.exports = (account) => {
   return new Promise((resolve, reject) => {

        const opts = { gzip:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: (serviceUrl) + '/user',
            method: 'POST',
            json: true,
            form: {
                username: account.username,
                email: account.email,
                FNAME: account.FNAME,
                LNAME: account.LNAME
            }
        }
        
        request(opts, function(error, response, body) {
            if (error){ reject(error) }
            else if (response.statusCode == 200) resolve(body)
            else reject(body)
        })
   })
}