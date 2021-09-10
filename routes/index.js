const authenController = require('../controllers/authen.controller')
const authorizationController = require('../controllers/authorization.controller')
const permissionController = require('../controllers/permission.controller')
const RoleController = require('../controllers/roles.controller')
const StudentController = require('../controllers/student.controller')
const { authorise } = require('../untils/index')
const server = require('express').Router()

server.post('/auth/register' , authenController.register)
server.post('/auth/token' ,  authenController.access_token )
// Role
server.post('/role/create' ,authorise.isAuthen ,RoleController.create )
server.patch('/role/addScope' ,authorise.isAuthen , RoleController.updateRoleScope )
// Permission
server.patch('/permission/assignee' ,authorise.isAuthen ,permissionController.assignRoletoUser )
server.patch('/permission/addScope' , authorise.isAuthen , permissionController.addScopeToPermission)
//server.get('/permission' ,authorise.isAuthen ,permissionController.getPermissionById )
server.get('/history' , authorise.isAuthen , authorizationController.History )
server.get('/realtime' , authorise.isAuthen , authorizationController.Realtime )  
// report&&table
server.get('/report/student' , authorise.isAuthen , StudentController.student_table )
server.post('/login' , authenController.access_token_ , authorise.isAuthen , permissionController.getPermission_)
server.post('/permission' ,  authorise.isAuthen , permissionController.getPermission_)

server.get('/decode'  ,  authorise.isAuthen , (req ,res ) => {

        res.status(200).send(req.jwtDecode)
} )
module.exports = server