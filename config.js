require('dotenv').config()

module.exports = {
    serverConfig: {
        port: process.env.PORT || 3000,
    },
    databaseConfig: {
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        server: process.env.SERVER_DATABASE,
        database: process.env.DATABASE_NAME,
        port: parseInt(process.env.PORT_DB),
        connectionTimeOut: parseInt(process.env.TIME_OUT)
    },
    authenticationConfig: {
        secretToken: process.env.SECRET_SESSION,
        secretRefreshToken: process.env.SECRET_REFRESH,
        expireInSession: process.env.EXPIRE_SESSION_TIME,
        expireInRefresh: parseInt(process.env.EXPIRE_REFRESH_TOKEN_TIME)
    }
    /*
    adConfig: {
        url: process.env.LDAP_URL,
        baseDN: process.env.BASE_DN,
        username: process.env.USER_AD,
        password: process.env.PASSWORD_AD
    }*/
}