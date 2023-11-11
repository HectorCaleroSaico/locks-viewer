const express = require('express')
const cors = require('cors')
const path = require('path')
const { serverConfig } = require('../config')
const locksRouter = require('../routes/lock.routes')
const userRouter = require('../routes/user.routes')
const databaseRouter = require('../routes/database.routes')
const reportRouter = require('../routes/report.route')
const cookieParser = require('cookie-parser')

class Server {

    constructor() {

        this.app = express()
        this.port = serverConfig.port

        this.middlewares()
        //this.connectDataBase()
        
        this.enabledCookies()

        this.routes()


    }

    /*
    async connectDataBase() {

        /*
        console.log("Conectando a la base de datos ...")

        return setTimeout(() => {

            console.log("Base de datos SQL Server conectada")

        }, 2000)
        //

        sqlConnection()

    }*/

    middlewares() {

        //Cors
        this.app.use(cors({
            origin: 'http://localhost:5173',
            credentials:true,
            optionsSuccessStatus: 200 
        }))

        /*
        this.app.use(cors({
            origin: '*',
            optionsSuccessStatus: 200 
        }))
        */

        //Writing and reading body
        this.app.use(express.json())
        this.app.use(express.static(path.resolve(__dirname, '../client/dist')))

    }

    routes() {

        this.app.use('/api/locks', locksRouter)
        this.app.use('/api/users', userRouter)
        this.app.use('/api/databases', databaseRouter)
        this.app.use('/api/report', reportRouter)

        this.app.get('*', (req, res) => {
            
            res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))

        })
    }

    enabledCookies () {

        this.app.use(cookieParser())

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Server running in port: ${this.port}`)
            console.log(`Para acceder al aplicativo: http://localhost:${this.port}`)
        })

    }

}

module.exports = Server