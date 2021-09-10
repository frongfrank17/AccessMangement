
const server = require('express').Router()
const authenController  =require('../../controllers/v2/authencation.controller')
server.post('/auth/token' , authenController.access_token )
server.post('/auth/register' , authenController.register)

module.exports = server