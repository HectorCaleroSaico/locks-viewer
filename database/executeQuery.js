const { sqlConnection } = require('../database/connection')

const executeQuery = async (query) => {

    try {
        
        const pool = await sqlConnection()
        const result = await pool.request()
            .query(query)

        return {
            result,
            error: null
        }

    } catch (error) {

        console.log('--------------------- Error Log ---------------------')
        console.log(`- ${err.name} :  ${err.message}`)
        console.log('--------------------- Fin Error ---------------------')
        
        return {
            result: null,
            error: error
        }

    }

}

const executeStoreProcedure = async (storeProcedure) => {

    try {
        
        const pool = await sqlConnection()
        const result = await pool.request()
            .execute(storeProcedure)

        return {
            result: result.recordset,
            error: null
        }
    } catch (err) {
        console.log('--------------------- Error Log ---------------------')
        console.log(`- ${err.name} :  ${err.message}`)
        console.log('--------------------- Fin Error ---------------------')

        return {
            result: null,
            error: {
                errorName: err.name,
                errorMessage: `Error en conexión con la BD: ${err.name}: ${err.message}`,
                errorLog: `${err.name}: ${err.message}`
            }
        }

    }


}

const executeStoreProcedureReport = async (storeProcedure, params) => {

    try {
        
        const pool = await sqlConnection()
        const result = await pool.request()
            .input('FechaInicioBloqueo', params.fechaInicioBloqueo)
            .input('FechaFinalBloqueo', params.fechaFinalBloqueo)
            .input('UsuarioKiller', params.usuarioKiller)
            .input('HostName', params.hostName)
            .input('Programa', params.programa)
            .input('TipoProceso', params.tipoProceso)
            .execute(storeProcedure)

        return {
            result: result.recordset,
            error: null
        }

    } catch (err) {
        console.log(err)
        console.log('--------------------- Error Log ---------------------')
        console.log(`- ${err.name} :  ${err.message}`)
        console.log('--------------------- Fin Error ---------------------')

        return {
            result: null,
            error: {
                errorName: err.name,
                errorMessage: `Error en conexión con la BD: ${err.name}: ${err.message}`,
                errorLog: `${err.name}: ${err.message}`
            }
        }

    }

}

const executeStoreProcedureKill = async (storeProcedure, params) => {

    try {
        const pool = await sqlConnection()
        const result = await pool.request()
            .input('IdSpid', params.IdSpid)
            .input('TipoProceso', 'M')
            .input('UsuarioKiller', params.UsuarioKiller)
            /*.input('Hostname', params.Hostname)
            .input('Programa', params.Programa)
            .input('UsuarioBD', params.UsuarioBD)
            .input('Consulta', params.Consulta)*/
            .execute(storeProcedure)

        return {
            result: result.recordset,
            error: null
        }
    } catch (err) {

        console.log('--------------------- Error Log ---------------------')
        console.log(`- ${err.name} :  ${err.message}`)
        console.log('--------------------- Fin Error ---------------------')

        return {
            result: null,
            error: {
                errorName: err.name,
                errorMessage: `Error en conexión con la BD: ${err.name}: ${err.message}`,
                errorLog: `${err.name}: ${err.message}`
            }
        }

    }


}

const executeStoreProcedureUser = async (storeProcedure, params) => {

    try {
        const pool = await sqlConnection()
        const result = await pool.request()
            .input('pUsuario', params.username)
            .input('pPassword', params.password)
            .execute(storeProcedure)

        return {
            result: result.recordset,
            error: null
        }
    } catch (err) {

        console.log('--------------------- Error Log ---------------------')
        console.log(`- ${err.name} :  ${err.message}`)
        console.log('--------------------- Fin Error ---------------------')

        return {
            result: null,
            error: {
                errorName: err.name,
                errorMessage: `Error en conexión con la BD: ${err.name}: ${err.message}`,
                errorLog: `${err.name}: ${err.message}`
            }
        }

    }

}

module.exports = {
    executeQuery,
    executeStoreProcedure,
    executeStoreProcedureKill,
    executeStoreProcedureReport,
    executeStoreProcedureUser
}