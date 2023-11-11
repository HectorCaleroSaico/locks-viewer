const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const { authenticationConfig } = require('../config')

const verficationSession = async (req = request, res = response, next) => {

    const authorization = req.get('authorization')

    let token = null

    if ( authorization && authorization.toLocaleLowerCase().startsWith('bearer') ) {

        token = authorization.substring(7)

    }

    try {
        

        const decodedToken = jwt.verify(token, authenticationConfig.secretToken)

        if (token && decodedToken?.iat && req.cookies.tokenRefresh) {

            req.isSessionValid = true

            next()

        } else {

            return res.status(401).json({
                endpointDescription: 'GET - API: Visor de Bloqueos',
                data: {
                    msg: 'Bloqueos Recientes',
                    isSessionValid: false,
                    error: 'Token missing or invalid'
                }
            })
        }

    } catch (error) {

        return res.status(401).json({
            endpointDescription: 'GET - API: Visor de Bloqueos',
            data: {
                msg: 'Acceso restringido',
                isSessionValid: false,
                error: error?.message,
                expiredAt: error?.expiredAt
            }
        })

    }

}

module.exports = {
    verficationSession
}