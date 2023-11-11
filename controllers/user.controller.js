const { request, response, json } = require('express')
const jwt = require('jsonwebtoken')
const { v4: uuidV4 } = require('uuid')
const { executeStoreProcedureUser } = require('../database/executeQuery')
const { sp_sign_in_users } = require('../database/storeProcedures')
const { authenticationConfig } = require('../config')

const refreshToken = async (req = request, res = response) => {

    const { tokenRefresh } = req.cookies

    if (tokenRefresh) {

        try {
            
            const decodedToken = jwt.verify(tokenRefresh, authenticationConfig.secretRefreshToken)

            if (decodedToken) {

                const userPayloadToken = {
                    uuidUser: decodedToken.uuidUser,
                    codeUser: decodedToken.codeUser,
                    fullName: decodedToken.fullName
                }

                const configToken = decodedToken.remember ? {} : { expiresIn: authenticationConfig.expireInSession }

                const configCookie = decodedToken.remember ? {} : {
                    maxAge: 1000*60*60*authenticationConfig.expireInRefresh,
                    httpOnly: true
                }

                const newSessionToken = jwt.sign(userPayloadToken, authenticationConfig.secretToken, configToken)

                const newTokenRefresh = jwt.sign(userPayloadToken, authenticationConfig.secretRefreshToken, configToken)

                res.cookie('tokenRefresh', newTokenRefresh, configCookie)

                return res.status(200).json({
                    endpointDescription: 'GET - API: Token User',
                    data: {
                        result: {
                            CodigoUsuario: decodedToken.codeUser,
                            NombreUsuario: decodedToken.fullName,
                            tokenSession: newSessionToken,
                            isSessionValid: true
                        },
                        error: null
                    }
                })

            }

        } catch (error) {

            return res.status(401).json({
                endpointDescription: 'GET - API: Token User',
                data: {
                    msg: 'Acceso Restringido',
                    isSessionValid: false,
                    error: error?.message
                }
            })
            
        }


    } else {

        return res.status(401).json({
            endpointDescription: 'GET - API: Token User',
            data: {
                msg: 'Acceso Restringido',
                isSessionValid: false
            }
        })

    }

}

const signOff = async (req = request, res = response) => {

    res.clearCookie('tokenRefresh')

    res.status(401).json({
        endpointDescription: 'GET - API: Sign Off',
        data: {
            msg: 'Cesión terminada',
            isSessionValid: false
        }
    })

}

const signInv2 = async (req = request, res = response) => {

    const { username, password, remember } = req.body;

    const responseData = await executeStoreProcedureUser(sp_sign_in_users, {
        username,
        password
    })

    const { result, error } = responseData;

    const userData = result[0]

    if ( userData && userData?.Validacion === 'SI' ) {

        const userPayloadToken = {
            uuidUser: uuidV4(),
            codeUser: userData.CodigoUsuario,
            fullName: userData.NombreUsuario,
            remember
        }

        const configToken = remember ? {} : { expiresIn: authenticationConfig.expireInSession }

        const configCookie = remember ? {} : {
            maxAge: 1000*60*60*authenticationConfig.expireInRefresh,
            httpOnly: true
        }

        const tokenSession = jwt.sign(userPayloadToken, authenticationConfig.secretToken, configToken)

        const tokenRefresh = jwt.sign(userPayloadToken, authenticationConfig.secretRefreshToken, configToken)

        res.cookie('tokenRefresh', tokenRefresh, configCookie)

        return res.status(200).json({
            endpointDescription: 'POST - API: Login User',
            data: {
                result: [
                    {
                        ...userData,
                        tokenSession
                    }
                ],
                error
            }
        })

    } 

    return res.status(401).json({
        endpointDescription: 'POST - API: Login User',
        data: {
            ...responseData
        }
    })

}


module.exports = {
    signInv2,
    signOff,
    refreshToken
}