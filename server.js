
const mongoose = require('mongoose')
Schema = mongoose.Schema
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const server = require('http').createServer(app)
const logger = require('morgan')
const { authorise } = require('./untils')
var cookieParser = require('cookie-parser')
const csrf = require('csurf')
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const config = require('./config') 
const corsMiddleware = ({
    origins: ['*'],
    allowHeaders: ['Content-Type','Content-Length','Authorization'],
})
const RateLimitMid = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 30 ,
    message:
    "Too many accounts created from this IP, please try again after an 1 Minutes "
  });
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded( { extended:true }))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded( {extended:true} ))
app.use(cookieParser())
app.use(cors(corsMiddleware))

server.listen(config.serverSettings.port, () => {

    console.log(`---${config.name} Service ---`)
    console.log(`Connecting to ${config.name} repository...`)

    mongoose.Promise = global.Promise
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(config.dbSettings.url)
  //  console.log(config.dbSettings.url)
    const db = mongoose.connection

    db.on('error', (err) => {
        console.error(err)
        process.exit(1)
    })

    db.once('open',() => {
        console.log('Connected. Starting Server')
      
   //console.log(process.env.SERVICE_BILL)
     
        app.use('/api' ,  (req ,res , next ) => {
            console.log(req)
            next()
        } , RateLimitMid ,  require('./routes'))

        app.use('/api/v2' , RateLimitMid , require('./routes/v2'))
     
        console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
    })
})  

process.on('SIGINT', () => {
    process.exit(0)
})

// Graceful shutdown
process.on('SIGTERM', () => {

    console.log(`Closing ${config.name} Service.`)
    server.close((err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        console.log('Server closed.')

        mongoose.connection.close(false, () => {
            console.log('MongoDb connection closed.')
            process.exit(0)
        })
    })
})