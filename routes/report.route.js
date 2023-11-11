const { Router } = require('express')
const { getLocksReport } = require('../controllers/lock.controller')
const { verficationSession } = require('../middleware/verificationSession')

const router = Router()

router.get('/', verficationSession, getLocksReport)

module.exports = router