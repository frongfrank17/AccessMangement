module.exports = {
    name: 'Auth',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    serverSettings: {
        port: process.env.PORT || 3200
    },
    dbSettings: {
        db: process.env.DB || 'auth' || 'hermes?replicaSet=hermes&readPreference=secondaryPreferred',
        server: process.env.DB_SERVER || 'localhost:27017' || 'hermes:P%40ssw0rd2019@10.224.185.37:27017,10.224.185.38:27017,10.224.185.39:27017,10.224.185.101:27017',
        get url (){
            return `mongodb://${this.server}/${this.db}`
        }
    },
    tokenSettings: {
        publicKey: process.env.PUBLIC_KEY || 'cat4dog',
        accessTokenExpiry: 60 * 60 * 24 * 14, // 2 weeks.
        privateKey: process.env.PRIVATE_KEY || 'hermes4digital',
        refreshTokenExpiry: 60 * 60 * 24 * 14, // 2 weeks.
    }
}