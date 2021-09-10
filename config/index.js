module.exports = {
    name: 'Auth',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    serverSettings: {
        port: process.env.PORT || 3200
    },
    dbSettings: {
        db:  'AccessManagement' ,
        server: process.env.DB_SERVER || '10.224.188.14:27017',
        get url (){
            return `mongodb://${this.server}/${this.db}`
        }
    },
    tokenSettings: {
        publicKey: process.env.PUBLIC_KEY_ACCESS || 'Public_keyAccessT',
        publicKey: process.env.PUBLIC_KEY_REFRESH || 'Public_keyRefreshT',
        accessTokenExpiry: 60 * 1,
        privateKey: process.env.PRIVATE_KEY || 'Private_digital',
        refreshTokenExpiry: 60 * 2, 
    }
}