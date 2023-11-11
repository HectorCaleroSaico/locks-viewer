const { Router } = require('express')
const { getCurrentDatabase } = require('../controllers/database.controller')
const { verficationSession } = require('../middleware/verificationSession')

const router = Router()

router.get('/', verficationSession, getCurrentDatabase)

module.exports = router