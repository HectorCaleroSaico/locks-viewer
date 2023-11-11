const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const { executeStoreProcedure, executeStoreProcedureKill, executeStoreProcedureReport } = require('../database/executeQuery')
const { sp_get_locks, sp_kill_locks, sp_get_report_locks } = require('../database/storeProcedures')
const { authenticationConfig } = require('../config')

const getLocksData = async (req = request, res = response) => {

    const isSessionValid = req?.isSessionValid ? req?.isSessionValid : false

    const result = await executeStoreProcedure(sp_get_locks)

    res.json({
        endpointDescription: 'GET - API: Visor de Bloqueos',
        data: {
            msg: 'Bloqueos Recientes',
            ...result,
            isSessionValid
        }
    })

}

const getLocksReport = async (req = request, res = response) => {

    const isSessionValid = req?.isSessionValid ? req?.isSessionValid : false

    console.log(req.query)

    const data = {
        fechaInicioBloqueo: req.query.fechaInicioBloqueo,
        fechaFinalBloqueo: req.query.fechaFinalBloqueo,
        usuarioKiller: req.query.usuarioKiller,
        hostName: req.query.hostName,
        programa: req.query.programa,
        tipoProceso: req.query.tipoProceso
    }

    const result = await executeStoreProcedureReport(sp_get_report_locks, data)

    res.json({
        endpointDescription: 'GET - API: Reporte de Bloqueos',
        data: {
            msg: 'Reporte de Bloqueos',
            ...result,
            isSessionValid
        }
    })

}

const killLock = async (req = request, res = response) => {

    const isSessionValid = req?.isSessionValid ? req?.isSessionValid : false

    const params = req.body

    const result = await executeStoreProcedureKill(sp_kill_locks, params)

    res.json({
        endpointDescription: 'POST - API: Killer de Bloqueos',
        data: {
            ...result,
            isSessionValid
        }
    })

}

module.exports = {
    getLocksData,
    killLock,
    getLocksReport
}