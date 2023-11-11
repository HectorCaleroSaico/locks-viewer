const { request, response } = require('express')
const { databaseConfig } = require('../config')

const getCurrentDatabase = async (req = request, res = response) => {

    const isSessionValid = req?.isSessionValid ? req?.isSessionValid : false

    res.json({
        endpointDescription: 'POST - API: Visor de Bloqueos',
        data: {
            result: {
                databaseName: databaseConfig.database,
                isSessionValid
            }
        }
    })

}

module.exports = {
    getCurrentDatabase
}